app.controller('chatController', ['$scope','userFactory','chatFactory', ($scope,userFactory,chatFactory) => {
   /*
   initialization
    */
function init(){
    userFactory.getUser().then(user=>{
        $scope.user=user;
    })
};
init();
    /*
    * Angular variables
    * */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName="";
    $scope.roomId="";
    $scope.message="";
    $scope.messages=[];
    $scope.user={};
    /*
    * socket.io event handling
    * */
    const socket = io.connect('http://localhost:3000');
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });


    $scope.newMessage=()=>{
       //console.log($scope.message);
      // console.log($scope.roomId);
        socket.emit('newMessage',{
           message: $scope.message,
            roomId:$scope.roomId
        });
        $scope.message='';
        console.log($scope.user);

    };

    $scope.switchRoom=room=>{
        $scope.chatName=room.name;
        $scope.roomId=room.id;
        $scope.chatClicked = true;
        chatFactory.getMessages(room.id).then(data=>{
            //console.log(data);
            $scope.messages[room.id]=data;
            //console.log($scope.messages);
        });

    };

    $scope.newRoom = () => {
        // let randomName = Math.random().toString(36).substring(7);

        let roomName = window.prompt("enter room name");
        if (roomName!==""&&roomName!==null){
            socket.emit('newRoom', roomName);
        };



    };


    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };


}]);