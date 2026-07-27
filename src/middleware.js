// src/middleware.js
export async function onRequest(context, next) {
    const { url, cookies, redirect } = context;

    // Proteksi Rute Admin
    if (url.pathname.startsWith('/admin')) {
        // Cek ketersediaan cookie sesi dari Supabase (sesuaikan dengan nama cookie auth Anda)
        const hasSession = cookies.has('sb-access-token') || cookies.has('sb-refresh-token');
        
        if (!hasSession) {
            // Lempar ke halaman login jika tidak ada sesi
            return redirect('/login');
        }
    }

    // Lanjutkan request jika aman
    return next();
}