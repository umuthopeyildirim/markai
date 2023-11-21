import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
    redis: kv,
    // 5 requests from the same IP in 240 seconds
    limiter: Ratelimit.slidingWindow(2, '240 s'),
})

// This is for contact form or any other form that needs to be sent to discord.
// Currently not used
export async function POST(request: NextRequest) {
    // Rate limit requests using ratelimit limit
    const ip = request.ip ?? '127.0.0.1'
    const { limit, reset, remaining } = await ratelimit.limit(ip)

    // If the X-RateLimit-Remaining is 0, return an error
    if (remaining === 0) {
        return new NextResponse(JSON.stringify({ error: 'You have requested too many request try again in 5 min' }), {
            headers: {
                'Content-Type': 'application/json',
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Reset': reset.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
            },
            status: 429,
        });
    }

    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !message) {
        return new NextResponse(JSON.stringify({ error: 'All fields are required' }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 400,
        });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return new NextResponse(JSON.stringify({ error: 'Invalid email address' }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 400,
        });
    }

    // Send Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const webhookData = {
        content: 'New contact us push!',
        embeds: [
            {
                title: 'Message',
                description: message,
                color: 239632,
                fields: [
                    {
                        name: 'Email:',
                        value: email,
                    },
                ],
                author: {
                    name: `${firstName} ${lastName}`,
                },
            },
        ],
        attachments: [],
    };
    await fetch(<any>webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
    });

    // If all checks pass, return the data
    return new NextResponse(JSON.stringify({ firstName, lastName, email, message }), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 200,
    });
}