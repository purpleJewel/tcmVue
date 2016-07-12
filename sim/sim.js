(function(window){
window.Test = {};
let session = {};
Test.login = (params) => {
	session.siteName = '望京';
	session.siteId = 1;
	session.siteType = 2;
	session.userName = params.userName;
	session.userId = 1;
	session.userType = 2;
	session.lineName = '15号线';
	return session;
};
Test.logout = () => {
	session = {};
};

})(window);