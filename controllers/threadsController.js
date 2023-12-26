const Thread = require('../models/thread');
const Run = require('../models/run');
const { validateRun, validateThread } = require('../utils/validators');

exports.createRun = async (req, res, next) => {
    try {
        const { thread_id } = req.params;
        const { assistant_id, model, instructions, tools, metadata } = req.body;

        const thread = await Thread.findById(thread_id);
        if (!thread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        const runData = { assistant_id, model, instructions, tools, metadata };
        const { valid, errors } = validateRun(runData);
        if (!valid) {
            return res.status(400).json(errors);
        }

        const run = new Run(runData);
        run.thread = thread;
        await run.save();

        res.status(201).json(run);
    } catch (err) {
        next(err);
    }
};

exports.createThreadAndRun = async (req, res, next) => {
    try {
        const { assistant_id, model, instructions, tools, metadata } = req.body;

        const threadData = { assistant_id, model, instructions, tools, metadata };
        const { valid, errors } = validateThread(threadData);
        if (!valid) {
            return res.status(400).json(errors);
        }

        const thread = new Thread(threadData);
        await thread.save();

        const run = new Run(threadData);
        run.thread = thread;
        await run.save();

        res.status(201).json({ thread, run });
    } catch (err) {
        next(err);
    }
};

exports.listRuns = async (req, res, next) => {
    try {
        const { thread_id } = req.params;

        const thread = await Thread.findById(thread_id);
        if (!thread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        const runs = await Run.find({ thread: thread_id });
        res.status(200).json(runs);
    } catch (err) {
        next(err);
    }
};
