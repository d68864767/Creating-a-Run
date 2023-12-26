```javascript
const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Thread', threadSchema);
```
