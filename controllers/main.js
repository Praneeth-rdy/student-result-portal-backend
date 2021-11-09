exports.getResults = (request, response, next) => {
    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}

exports.getMyResult = (request, response, next) => {
    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}

exports.deleteResult = (request, response, next) => {
    response.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
    });
}

