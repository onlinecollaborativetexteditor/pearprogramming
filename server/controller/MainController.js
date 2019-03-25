module.exports = {
    getUserProjects: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_projects(id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getPendingUserProjects: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_pending_projects(id)
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    sendProjectRequest: (req, res) => {
        const {user_id, project_id} = req.body;
        req.app.get('db').send_project_request(user_id, project_id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    acceptProjectRequest: (req, res) => {
        const {id} = req.params;
        req.app.get('db').accept_project_request(id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    createProject: (req, res) => {
        const {project_name} = req.body;
        req.app.get('db').create_project(project_name)
        .then(project => res.status(200).send(project))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    userProjectJoin: (req, res) => {
        const {user_id, project_id, accepted} = req.body;
        req.app.get('db').user_project_join([user_id, project_id, accepted])
        .then(res.sendStatus(200))
    },
    deleteProject: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_project(id)
        .then(project => res.status(200).send(project))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getProjectFiles: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_project_files(id)
        .then(files => res.status(200).send(files))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getOneFile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_one_file(id)
        .then(file => res.status(200).send(file))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    createProjectFiles: (req, res) => {
        const {file_name, file_link, project_id} = req.body;
        req.app.get('db').createProjectFiles([file_name, file_link, project_id])
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    deleteProjectFiles: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_files(id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getUserProfile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_profile(id)
        .then(profile => res.status(200).send(profile))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    updateUserProfile: (req, res) => {
        const {email} = req.body;
        const {id} = req.params;
        const {user: oldUser} = req.session;
        let user_email = req.app.get('db').user.update_profile([email, id])
        user_email = user_email[0];
        session.user = {...oldUser, email}
        res.send(session.user);
    },
    updateUsername: (req, res) => {
        const {username} = req.body;
        const {id} = req.params;
        const {user: oldUser} = req.session;
        let user_username = req.app.get('db').user.update_username([username, id])
        user_username = user_username[0]
        session.user = {...oldUser, username}
        res.send(session.user)
    },
    deleteUserProfile: (req, res) => {
        const {id} = req.params;
        req.app.get('db').user.delete_profile(id)
        .then(res.sendStatus(200))
    }
}