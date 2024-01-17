async function loadModel() {
    return faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
}

async function detectMood(model) {
    const video = document.getElementById('webcam');
    const predictions = await model.estimateFaces({ input: video });

    if (predictions.length > 0) {
        // For simplicity, we're just logging the predictions. 
        // You'll need to analyze these to determine the mood.
        console.log(predictions);
        // Update the mood label on your webpage
        document.getElementById('moodLabel').innerText = 'Happy'; // Placeholder
    }

    // Re-run detection
    requestAnimationFrame(() => detectMood(model));
}

async function setupCamera() {
    const video = document.getElementById('webcam');
    const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function main() {
    const video = await setupCamera();
    video.play();

    const model = await loadModel();
    detectMood(model);
}

main();
