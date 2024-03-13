const express = require('express');
const { getTasks, getTaskById, addOrUpdateTask, deleteTask, getUserId } = require('../data/tasks');
const { getTaskCommentsById, deleteTaskComments, getTasksComments, addOrUpdateTaskComments } = require('../data/tasks_comments');
const { getTaskHistoryById, deleteTaskHistory, getTasksHistory, addOrUpdateTaskHistory } = require('../data/tasks_history');
const { mapCommentHistory, filterTasksByUserName } = require('./utility/mapCommentHistory');
const { idGenerator } = require('saveit-data-uitility');
const route = express.Router();


route.get('/tasks', async(req, res) => {
    try {
        const tasks = await getTasks();
        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/getTasksByUser', async(req, res) => {
    try {
        const tasks = await getTasks();
        const user = await getUserId(req.body.userName);
        if(user.Item?.isAdminUser) {
         res.send(tasks);
        } else {
            const filteredTasks = filterTasksByUserName(req.body.userName, tasks?.Items)
            res.send(filteredTasks);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.get('/tasks/comments', async(req, res) => {
    try {
        const tasks = await getTasksComments();
        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});


route.get('/tasks/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const tasksById = await getTaskById(id);
        // const taskComment = await getTasksComments();
        // const taskHistory = await getTasksHistory();
        const mappedTask = await mapCommentHistory(tasksById, id)
        
        res.send({mappedTask});
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.get('/tasks/comments/:id', async(req, res) => {
    const id = req.params.id;
    try {
        // const tasksById = await getTaskById(id);
        const taskComment = await getTaskCommentsById(id);
        // tasksById.comments = taskComment;
        res.send({taskComment});
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.get('/tasks/history/:id', async(req, res) => {
    const id = req.params.id;
    try {
        // const tasksById = await getTaskById(id);
        const taskHistory = await getTaskHistoryById(id);
        // tasksById.comments = taskHistory;
        res.send({taskHistory});
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/tasks/history', async(req, res) => {
    const getTask = await getTaskById(req.body.task_id);
    if (getTask.Item) {
    const allHistory = await getTasksHistory();
    const id = idGenerator();
    const taskHistory = req.body;
    taskHistory.id = id+"";
    try {
        const newHistory = await addOrUpdateTaskHistory(taskHistory);
        if (newHistory) {
        const mappedTask = await mapCommentHistory(getTask.Item)
            res.send(mappedTask);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
} else {
    res.status(400).json({msg: 'Task not found'});
}
});

route.post('/tasks/comments', async(req, res) => {
    const getTask = await getTaskById(req.body.task_id);
    if (getTask.Item) {
        const allComments = await getTasksComments();
        const id = idGenerator();
        const taskComment = req.body;
        taskComment.id = id+"";
        try {
            const newComment = await addOrUpdateTaskComments(taskComment);
            if (newComment) {
            const mappedTask = await mapCommentHistory(getTask.Item)
            res.send(mappedTask);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    } else {
        res.status(400).json({msg: 'Task not found'});
    }
    
});

route.delete('/tasks/comments/:id', async(req, res) => {
    const id = req.params.id;
    try {
        // const tasksById = await getTaskById(id);
        const taskComment = await deleteTaskComments(id);
        tasksById.comments = taskComment;
        res.send('comment deleted successfully ');
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.post('/tasks', async(req, res) => {
    const allTasks = await getTasks();
    const id = idGenerator();
    const task = req.body;
    task.task_id = id;
    task
    try {
        const newTask = await addOrUpdateTask(task);
        res.send(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.put('/tasks/:id', async(req, res) => {
    const task = req.body;
    const {id} = req.params;
    task.task_id = id;

    try {
        const tasksById = await getTaskById(id);
        // const taskComment = await getTasksComments();
        // const taskHistory = await getTasksHistory();
        await addOrUpdateTask(task);
        const mappedTask = await mapCommentHistory(tasksById, id)
        res.send(mappedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

route.delete('/tasks/:id', async(req, res) => {
    const {id} = req.params;
    try {
        await deleteTask(id);
        await deleteTaskComments(id);
        await deleteTaskHistory(id);
        res.json(await deleteTask(id));
        // res.send(updatedCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

module.exports=route;



// {
//     "id": "2",
//     "comment": "test comment 2",
//     "comment_date": "23/10/2023",
//     "task_id": "2",
//     "userName": "test"
//    }