const Run = require('../models/run');
const Thread = require('../models/thread');

exports.createRun = async (req, res, next) => {
    try {
        const { thread_id } = req.params;
        const { assistant_id, model, instructions, tools, metadata } = req.body;

        const thread = await Thread.findById(thread_id);
        if (!thread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        const run = new Run({
            thread_id,
            assistant_id,
            model,
            instructions,
            tools,
            metadata
        });

        const savedRun = await run.save();
        return res.status(201).json(savedRun);
    } catch (error) {
        next(error);
    }
};

exports.createThreadAndRun = async (req, res, next) => {
    try {
        const { assistant_id, thread_content, model, instructions, tools, metadata } = req.body;

        const thread = new Thread({
            content: thread_content,
            assistant_id
        });

        const savedThread = await thread.save();

        const run = new Run({
            thread_id: savedThread._id,
            assistant_id,
            model,
            instructions,
            tools,
            metadata
        });

        const savedRun = await run.save();
        return res.status(201).json({ thread: savedThread, run: savedRun });
    } catch (error) {
        next(error);
    }
};

exports.listRuns = async (req, res, next) => {
    try {
        const { thread_id } = req.params;
        const runs = await Run.find({ thread_id });
        return res.status(200).json(runs);
    } catch (error) {
        next(error);
    }
};

exports.getRun = async (req, res, next) => {
    try {
        const { thread_id, run_id } = req.params;
        const run = await Run.findOne({ _id: run_id, thread_id });
        if (!run) {
            return res.status(404).json({ error: 'Run not found' });
        }
        return res.status(200).json(run);
    } catch (error) {
        next(error);
    }
};

exports.modifyRun = async (req, res, next) => {
    try {
        const { thread_id, run_id } = req.params;
        const { metadata } = req.body;

        const run = await Run.findOneAndUpdate({ _id: run_id, thread_id }, { metadata }, { new: true });
        if (!run) {
            return res.status(404).json({ error: 'Run not found' });
        }
        return res.status(200).json(run);
    } catch (error) {
        next(error);
    }
};

exports.submitToolOutputs = async (req, res, next) => {
    try {
        const { thread_id, run_id, tool_outputs } = req.body;

        const run = await Run.findOneAndUpdate({ _id: run_id, thread_id }, { tool_outputs }, { new: true });
        if (!run) {
            return res.status(404).json({ error: 'Run not found' });
        }
        return res.status(200).json(run);
    } catch (error) {
        next(error);
    }
};

exports.cancelRun = async (req, res, next) => {
    try {
        const { thread_id, run_id } = req.params;

        const run = await Run.findOneAndUpdate({ _id: run_id, thread_id }, { status: 'cancelled' }, { new: true });
        if (!run) {
            return res.status(404).json({ error: 'Run not found' });
        }
        return res.status(200).json(run);
    } catch (error) {
        next(error);
    }
};
