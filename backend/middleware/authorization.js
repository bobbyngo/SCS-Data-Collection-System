const Role = require('../config/roleEnum');

function isSuperAdmin(req, res, next) {
    const user = req.session.user;
    return Role[user.role_id] === 'Administrator';
}

const isAdmin = () => {
    // Retrieve userData within the function to get the latest information
    let userData = localStorage.getItem('user');

    if (!userData) {
        console.log("No user data found in local storage.");
        return false;
    }

    try {
        const user = JSON.parse(userData);
        console.log("Parsed user data:", user);

        // Check for admin role ids: 0 (Administrator)
        const adminRoles = [0]; // Based on the user object structure provided
        const isUserAdmin = adminRoles.includes(user.user.role_id);

        console.log(`User Role ID: ${user.user.role_id}, Is Admin: ${isUserAdmin}`);
        return isUserAdmin;

    } catch (error) {
        console.error("Error parsing user data:", error);
        return false;
    }
};

function isSiteRole(req, res, next) {
    const user = req.session.user;
    const role = Role[user.role_id];
    if (
        isSuperAdmin(req) ||
        role === 'Site_Data_Collectors' ||
        role === 'Site_Administrator'
    ) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isHCRole(req, res, next) {
    const user = req.session.user;
    if (
        isSuperAdmin(req) ||
        user.role === 'HC_Viewer' ||
        user.role === 'HC_Administrator'
    ) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isHCAdmin(req, res, next) {
    const user = req.session.user;
    if (isSuperAdmin(req) || user.role === 'HC_Administrator') {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isSiteAdmin(req, res, next) {
    const user = req.session.user;
    if (isSuperAdmin(req) || user.role === 'Site_Administrator') {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isAdminToModify(userTargetRoleId, currentUserRoleId) {
    // A function checking admin role and compare they are the same admin in the department
    return (
        (Role[userTargetRoleId] === Role[currentUserRoleId] &&
            (Role[currentUserRoleId] === 'HC_Administrator' ||
                Role[currentUserRoleId] === 'Site_Administrator')) ||
        Role[currentUserRoleId] === 'Administrator'
    );
}

function isAdminInSameDepartmentToModify(userTargetRoleId, currentUserRoleId) {
    // Function checking if the current user role is admin, if yes, they can perform action to the
    // target in their department
    if (
        Role[currentUserRoleId] === 'HC_Administrator' &&
        Role[userTargetRoleId].includes('HC')
    ) {
        return true;
    }
    if (
        Role[currentUserRoleId] === 'Site_Administrator' &&
        Role[userTargetRoleId].includes('Site')
    ) {
        return true;
    }

    return Role[currentUserRoleId] === 'Administrator';
}

const authMiddleware = {
    isSuperAdmin,
    isAdmin,
    isSiteRole,
    isHCRole,
    isHCAdmin,
    isSiteAdmin,
    isAdminToModify,
    isAdminInSameDepartmentToModify,
};
module.exports = authMiddleware;
