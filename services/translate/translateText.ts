async function translateText(textArray: any, targetLanguage: string): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
    const baseUrlClient = process.env.NEXT_PUBLIC_URL_WEBSITE;
    const url = `https://translate-pa.googleapis.com/v1/translateHtml`;

    if (!textArray || !targetLanguage) {
        throw new Error('Text and target language are required.');
    }

    // Nếu ngôn ngữ đích là tiếng Việt, trả về nguyên văn không dịch
    if (targetLanguage === 'vi') {
        // Trả về định dạng giống như API để đảm bảo tính nhất quán với cách sử dụng trong TranslationWrapper
        const mockResponse = Array.isArray(textArray) ? 
            { 0: textArray } : // Nếu là mảng, giữ nguyên mảng các văn bản
            { 0: [textArray] }; // Nếu là chuỗi đơn, bọc trong mảng
            
        return mockResponse as unknown as string;
    }

    // Gói gọn payload theo cấu trúc yêu cầu
    const requestBody = [
        [
            textArray, // nội dung cần dịch
            `${targetLanguage === 'vi' ? "auto" : "vi"}`, // ngôn ngữ gốc
            targetLanguage, // ngôn ngữ đích
        ],
        'te' // mã ngôn ngữ thứ hai nếu cần
    ];
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json+protobuf',
                'X-Goog-Api-Key': apiKey ?? "",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error response:', data);
            throw new Error(data?.error?.message || 'Translation failed');
        }

        return data;

    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Translation failed');
    }
}

export { translateText };