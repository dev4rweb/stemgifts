export const userTaskStoreApi = (task_id, is_done = 0) => {
    return axios.post('/user-tasks', {task_id, is_done})
        .then(res => {
            console.log('userTaskStoreApi', res)
            return res
        }).catch(err => {
            console.error('userTaskStoreApi err', err.response.data)
            return err
        });
};

export const userTaskPatchApi = userTask => {
    return axios.post(`/user-tasks/${userTask.id}`, {
        _method: 'PATCH',
        ...userTask
    }).then(res => {
            console.log('userTaskPatchApi', res)
            return res
        }).catch(err => {
            console.error('userTaskPatchApi err', err.response.data)
            return err
        });
};
