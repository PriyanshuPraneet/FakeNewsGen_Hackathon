document.getElementById('generate-btn').addEventListener('click', generateFakeNews);

async function generateFakeNews() {
    try {
        const response = await fetch('/api/generate-fake-news');
        const data = await response.json();
        document.getElementById('fake-news').innerText = data.fakeNews || 'No response from the API.';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('fake-news').innerText = 'An error occurred while generating fake news.';
    }
}
