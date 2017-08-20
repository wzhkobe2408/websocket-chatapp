// Make connection
var socket=io.connect('http://localhost:4000');
//DOM
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var app=document.getElementById('app');

message.addEventListener('keydown',function(){
	if(event.keyCode==13){
		sendMessage();
		feedback.innerHTML='';
		return false;
	}
});


//click--emit events
btn.addEventListener('click',function(){
	sendMessage();
});

//sendMessage
function sendMessage(){
	var myDate = new Date();
	var mytime=myDate.toLocaleTimeString(); 
	socket.emit('chat',{
		message:message.value,
		handle:handle.value,
		time:mytime
	});
	message.value='';
}




message.addEventListener('keypress',function(){
	if(event.keyCode!==13){
		socket.emit('type',handle.value);
	}	
});

socket.on('chat',function(data){
	feedback.innerHTML='';
	output.innerHTML +='<div class="message-item"><p class="mainmessage"><strong>'+data.handle+':</strong>'+data.message+'</p>'+
						'<p class="timemessage">'+data.time+'</p>'+
						'<div>'
});


socket.on('type',function(data){
	feedback.innerHTML ='<p><em>'+data+'</em> is typing...'+'</p>';
});
