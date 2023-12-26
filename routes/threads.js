const express = require('express');
const router = express.Router();
const threadsController = require('../controllers/threadsController');
const runsController = require('../controllers/runsController');

// Create a new run within a specified thread
router.post('/:thread_id/runs', threadsController.createRun);

// Create a thread and run it immediately with a single request
router.post('/runs', threadsController.createThreadAndRun);

// Get a list of runs belonging to a specific thread
router.get('/:thread_id/runs', threadsController.listRuns);

// Retrieve details about a specific run
router.get('/:thread_id/runs/:run_id', runsController.getRun);

// Modify a run, typically used to add metadata
router.post('/:thread_id/runs/:run_id', runsController.modifyRun);

// Submit outputs from tool calls when a run requires action
router.post('/:thread_id/runs/:run_id/submit_tool_outputs', runsController.submitToolOutputs);

// Cancel a run that is in progress
router.post('/:thread_id/runs/:run_id/cancel', runsController.cancelRun);

module.exports = router;
