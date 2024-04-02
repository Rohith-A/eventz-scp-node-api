const { getEventz } = require("../../data/eventsSchema");
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

const filterTasksByUserName = async(userName, tasks) => {
    const filteredTasks = []
    const events = await getEventz()
     tasks?.Items?.forEach((booking) => {
        if(booking.userName === userName) {
            const event = events.Items.find((v) => v.event_id === booking.event_id)
          filteredTasks.push({booking, event});
        }
    })
    return filteredTasks;
}

module.exports={
    mapCommentHistory,
    filterTasksByUserName
};