```javascript
const { check } = require('express-validator');

exports.validateThread = [
    check('assistant_id')
        .not()
        .isEmpty()
        .withMessage('Assistant ID is required')
        .isString()
        .withMessage('Assistant ID must be a string'),
    check('model')
        .optional()
        .isString()
        .withMessage('Model must be a string'),
    check('instructions')
        .optional()
        .isString()
        .withMessage('Instructions must be a string'),
    check('tools')
        .optional()
        .isArray()
        .withMessage('Tools must be an array of strings'),
    check('metadata')
        .optional()
        .isObject()
        .withMessage('Metadata must be an object')
];

exports.validateRun = [
    check('thread_id')
        .not()
        .isEmpty()
        .withMessage('Thread ID is required')
        .isMongoId()
        .withMessage('Thread ID must be a valid MongoID'),
    check('assistant_id')
        .not()
        .isEmpty()
        .withMessage('Assistant ID is required')
        .isString()
        .withMessage('Assistant ID must be a string'),
    check('model')
        .optional()
        .isString()
        .withMessage('Model must be a string'),
    check('instructions')
        .optional()
        .isString()
        .withMessage('Instructions must be a string'),
    check('tools')
        .optional()
        .isArray()
        .withMessage('Tools must be an array of strings'),
    check('metadata')
        .optional()
        .isObject()
        .withMessage('Metadata must be an object'),
    check('tool_outputs')
        .optional()
        .isObject()
        .withMessage('Tool outputs must be an object'),
    check('status')
        .optional()
        .isIn(['running', 'completed', 'cancelled'])
        .withMessage('Status must be either "running", "completed", or "cancelled"')
];
```
