(function(window){
window.Test = {};
Test.login = function(params){
	if (localStorage.userId) return;
	localStorage.setItem('userName', params.userName);
	localStorage.setItem('userId', 1);
	localStorage.setItem('setName', "望京");
};
Test.logout = function(){
	for (let key in localStorage) {
		localStorage.removeItem(key);
	}
};

})(window);