const { getTasksComments } = require("../../data/tasks_comments");
const { getTasksHistory } = require("../../data/tasks_history");

const mapCommentHistory = async (task) => {
    const allComments = await getTasksComments();
    const allHistory = await getTasksHistory();
    const taskComment = allComments;
    const taskComments = []
    taskComment.Items.forEach((v) => {
        if(v.task_id === task?.task_id) {
            taskComments.push(v);
        }
    })
    const taskHistory = allHistory;
    const taskHistoryList = [];
    taskHistory.Items.forEach((v) => {
        if(v.task_id === task?.task_id) {
            taskHistoryList.push(v);
        }
    })
    task.comments = taskComments;
    task.history = taskHistoryList;
    return task;
}

const filterTasksByUserName = (userName, tasks) => {
    const filteredTasks = []
     tasks?.forEach((task) => {
        if(task.userName === userName) {
          filteredTasks.push(task);
        }
    })
    return filteredTasks;
}
module.exports={
    mapCommentHistory,
    filterTasksByUserName
};