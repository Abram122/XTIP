import appError from "./appError.js";
import httpStatusText from "./httpStatusText.js";

const asyncHandler = (fn) => {
    return async (req, res, next, ...args) => {
        try {
            await fn(req, res, next, ...args);  // The to be wrapped must be async & we wait for it here to handle errors & promises returns from it.
        } catch (err) {
            const error = appError.create(err.message, 500,httpStatusText.ERROR);
            return res.status(500).json(error);
        }
    };
};

export default asyncHandler;
