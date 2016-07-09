(function(window){
window.Test = {};
let session = {};
Test.login = (params) => {
	session.siteName = '望京';
	session.siteId = 1;
	session.userName = params.userName;
	session.userId = 1;
	return session;
};
Test.logout = () => {
	session = {};
};


})(window);