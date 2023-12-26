```javascript
const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
    thread_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    assistant_id: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: false
    },
    tools: {
        type: [String],
        required: false
    },
    metadata: {
        type: Object,
        required: false
    },
    tool_outputs: {
        type: Object,
        required: false
    },
    status: {
        type: String,
        enum: ['running', 'completed', 'cancelled'],
        default: 'running'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Run', runSchema);
```
