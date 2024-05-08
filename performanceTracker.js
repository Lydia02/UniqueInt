// SimplePerformanceTracker.js

function startTracking() {
    const startTime = Date.now();  // Get current time in milliseconds
    return { startTime };  // Return the start time
}

function endTracking(trackingData) {
    const endTime = Date.now();  // Get current time in milliseconds
    const duration = endTime - trackingData.startTime;  // Calculate duration
    console.log(`Execution time: ${duration} ms`);  // Log the execution time
}

module.exports = { startTracking, endTracking };
