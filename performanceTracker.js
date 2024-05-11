function startTracking() {
    const startTime = new Date();  // Get current time
    const startMemoryUsage = process.memoryUsage().heapUsed;  // Get initial memory usage in bytes (if possible)
    return { startTime, startMemoryUsage };  // Return the start time and initial memory usage
}

function endTracking(trackingData) {
    const endTime = new Date();  // Get current time
    const endMemoryUsage = process.memoryUsage().heapUsed;  // Get final memory usage in bytes (if possible)
    const duration = endTime - trackingData.startTime;  // Calculate duration in milliseconds

    console.log(`Execution time: ${duration} ms`);  // Log the execution time

    // Only log memory usage if it was possible to measure
    if (trackingData.startMemoryUsage && endMemoryUsage) {
        const memoryUsed = endMemoryUsage - trackingData.startMemoryUsage;  // Calculate memory used
        console.log(`Memory used: ${memoryUsed} bytes`);  // Log the memory used
    }
}

module.exports = { startTracking, endTracking };
