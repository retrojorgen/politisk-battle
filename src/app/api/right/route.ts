// FILE: pages/api/chat.ts

//import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  return new Response('Success!', {
    status: 200,
  });
}

export async function POST(req: Request) {
  /**
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

   */

  const { content } = await req.json();
  console.log(content);
  /**
  return new Response('Success!', {
    status: 200,
  });
   */

  const openaiApiKey = process.env.OPENAI_API;
  console.log(content);

  const payload = {
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content:
          'Du er partileder i Fremskrittspartiet Sylvi Listhaug. Svarene dine viser at du har planer om å bli statsminister. Forestill deg at spørsmålet kommer som en SMS. dermed må du svare kort og konkret. Bruk gjerne litt uformelt sms-språk og kanskje en emoji eller to hvis det passer.',
      },
      { role: 'user', content: content },
    ],
    max_tokens: 150,
  };
  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return new Response('Success!', {
        status: 400,
      });
    }

    const data = await response.json();
    return Response.json(data, {
      status: 200,
    });
    /**
    return Response(JSON.stringify(data), {
      status: 200,
    });
     */
  } catch (error) {
    console.error(error);
    return new Response('success', { status: 400 });
  }
}

/**
 *   {
    "model": "gpt-4-turbo",
    "messages": [
        {"role": "system", "content" : "Du er partileder i Fremskrittspartiet Sylvi Listhaug. Svarene dine viser at du har planer om å bli statsminister. Forestill deg at spørsmålet kommer som en SMS. dermed må du svare kort og konkret." },
        {"role":"user", "content": "Hvis FRP hadde vært en restaurant, hva hadde du servert?"}
    ],
    "max_tokens": 150
  }
 */
