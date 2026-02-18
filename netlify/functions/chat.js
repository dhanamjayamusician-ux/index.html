const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const message = body.message; // Make sure this matches what your index.html sends
        // --- THIS IS THE LINE THAT WAS MISSING ---
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // -----------------------------------------

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(message);
        const response = await result.response;
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: response.text() }),
        };
    } catch (error) {
        console.error("Error details:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
