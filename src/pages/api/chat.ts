import type { APIRoute } from 'astro';



export const prerender = false;



export const POST: APIRoute = async ({ request }) => {

    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;



    if (!GEMINI_API_KEY) {

        return new Response(JSON.stringify({ error: "API Key belum dikonfigurasi di file .env server." }), {

            status: 500,

            headers: { 'Content-Type': 'application/json' }

        });

    }



    try {

        const body = await request.json();

        const userMessage = body.message;



        if (!userMessage) {

            return new Response(JSON.stringify({ error: "Pesan tidak boleh kosong." }), {

                status: 400,

                headers: { 'Content-Type': 'application/json' }

            });

        }



        // Menggunakan model stabil gemini-3.6-flash dengan endpoint v1

        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent`;



        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                contents: [

                    {

                        role: "user",

                        parts: [

                            {

                                text: `Anda adalah asisten virtual profesional untuk portofolio Ariban Yoko, seorang Backend Engineer (ahli Python, Celery, Redis) dan TikTok Live Streamer Mobile Legends. Jawab pertanyaan berikut dengan ramah, profesional, dan ringkas: "${userMessage}"`

                            }

                        ]

                    }

                ]

            })

        });



        const data = await response.json();



        if (data.error) {

            console.error("Google Gemini API Error Detail:", JSON.stringify(data.error, null, 2));

            return new Response(JSON.stringify({ error: data.error.message || 'Gagal memproses AI dari Google.' }), {

                status: 500,

                headers: { 'Content-Type': 'application/json' }

            });

        }



        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, AI tidak merespons.";



        return new Response(JSON.stringify({ reply: candidateText }), {

            status: 200,

            headers: { 'Content-Type': 'application/json' }

        });



    } catch (err: any) {

        console.error("Internal Server Catch Error:", err);

        return new Response(JSON.stringify({ error: err.message || "Terjadi kesalahan internal pada server." }), {

            status: 500,

            headers: { 'Content-Type': 'application/json' }

        });

    }

};

