import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
Videomaster = new Mongo.Collection('videomaster');
Show = new Mongo.Collection('show');
Season = new Mongo.Collection('season');



import './main.html';
 import './jquery.js';
 import './bootstrap.min.js';
 import './dropzone.js';
 //import './owlcarousel.js';
 import './jquerytagsinput.js';

Meteor.startup(function () {
  Session.setDefault("templateName","homepage");
});



Template.body.helpers({
  template_name: function(){
    return Session.get("templateName")
  }
});

if (Meteor.isClient) {


	Template.browsevideos.helpers({
		
		// videomaster:function(){
			
		// 	return  Videomaster.find({},{sort: {createdAt:-1}});
		//  }
		//,
		show:function(){

			return Show.find({},{sort: {createdAt:-1}});
		}
		//,
		// season:function(){

		// 	return Season.find({},{sort: {createdAt:-1}});
		// }
		//,
		// , getshowtitle:function(id){

			
		//  	const showtitle = Show.findOne(id);
		//  	return showtitle.showtitle;
		//  }
		// getseasontitle:function(id){
		// 	const seasontitle = Season.findOne(id);
		// 	return seasontitle.season_title;
		// },
		// getcategorytitle:function(id){

		
		// 	const showcategorytitle = Show.findOne(id);
		// 	return showcategorytitle.showcategory;
		// }

	}); 


	Template.uploadvideos.helpers({
		
		show:function(){
			return Show.find({},{sort: {createdAt:-1}});
		},
		season:function(){

			return Season.find({},{sort: {createdAt:-1}});
		}


	}); 


	Template.homepage.helpers({
		
		videomaster:function(){
		
			return  Videomaster.find({},{sort: {createdAt:-1} ,skip: 0, limit: 12});
		 },
		 slidervideomaster:function(){
		
			return  Videomaster.find({},{sort: {createdAt:-1} ,skip: 0, limit: 3});
		 },
		 getshowtitle:function(id){

			
			const showtitle = Show.findOne(id);
			return showtitle.showtitle;
		},
		getseasontitle:function(id){
			const seasontitle = Season.findOne(id);
			return seasontitle.season_title;
		},
		getcategorytitle:function(id){

		
			const showcategorytitle = Show.findOne(id);
			return showcategorytitle.showcategory;
		},getshowactor:function(id){
			const showtitle = Show.findOne(id);
			return showtitle.showactor;
		}


	}); 



	Template.showvideodetail.helpers({

		getshowtitledetail:function(){
			const showtitle = Show.findOne(Session.get('getshowsessionvideoid'));
			return showtitle.showtitle;
		},
		getshowdescription:function(){
			const showtitle = Show.findOne(Session.get('getshowsessionvideoid'));
			return showtitle.showdescription;
			
		},
		getshowdirector:function(){
			const showtitle = Show.findOne(Session.get('getshowsessionvideoid'));
			return showtitle.showdirector;
		},
		getshowactor:function(){
			const showtitle = Show.findOne(Session.get('getshowsessionvideoid'));
			return showtitle.showactor;
		},
		getshowcategory:function() {
			const showtitle = Show.findOne(Session.get('getshowsessionvideoid'));
			return showtitle.showcategory;
		}
		,
		season:function(){
			return Season.find({"show_id":Session.get('getshowsessionvideoid')},{sort: {createdAt:-1}});
		},
		getvideoformshowid:function(id){

			
			return Videomaster.find({"season_id":id},{sort: {createdAt:-1}});
			
		}

	 });

	

}


Template.body.events({
  "click .homepage": function() {
    Session.set("templateName", "homepage");
  },
  "click .browsevideos": function() {
     Session.set("templateName", "browsevideos");
  },
 "click .uploadvideos": function() {
     Session.set("templateName", "uploadvideos");
     
  },
  "click .showdetailclass" : function(e,t){
 	var output = $(e.target).closest('.search-single-box').data('id');
 	 Session.set("templateName", "showvideodetail");
	Session.set("getshowsessionvideoid",output);
  },
  "click .popupopenonseason" : function(e,t){
  	var output=$(e.target).parent().find(".popupopenonseasonclass").data('id');
  	 Session.set("templateName", "youtubeplayerpopup");
	 Session.set("popupfindseasonid",output);

  }

});


Template.header.rendered= function(){
		
		$('.menu-burger, .menu-items').on('click', function() {
		  $('.menu-bg, .menu-items, .menu-burger').toggleClass('fs');
		  $('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
		});
		
		// <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	
	$(document).ready(function() {

		//$('.post-sign-in').hide();

		$(window).scroll(function() {  

			var scroll = $(window).scrollTop();
		
			if (scroll >= 15) {
				$("header").addClass("blueheader");
			} else {
				$("header").removeClass("blueheader");
			}
		});

	 


		function menuresponsiv(){
			if($(window).width() <= 640)
			{
				$("header nav ul").addClass('menu-items');
			}			
		}
		menuresponsiv();

		$(window).resize(function(){
			menuresponsiv();
		});

	 });

}




Template.showvideodetail.rendered= function(){

	  $('.owl-prev').hide();


	  setTimeout(function(){ 

		$(".owl-carousel").on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
		if (!event.namespace) return;
		var carousel = event.relatedTarget,
			element = event.target,
			current = carousel.current();
		$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
		$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
	  });
	   $(".right-slider").owlCarousel({
		items : 4,
		center:true, 
		nav:true,
		dots:true,
		margin: 30,
		singleItem:false,
		autoPlay: false,
		responsive:{
			0:{
				items:1,
			},
			480:{
				items:1,
			},
			768:{
				items:3,
			},
			769:{
				items:4,
			}
		}
		
      });
	

		 }, 1000);
		
		
	


}



Template.youtubeplayerpopup.rendered= function(){ 

   var video= Videomaster.find({season_id:Session.get('popupfindseasonid')}).fetch();
   //var result;
   
/*   var result ="[";
     
	for (var i = 0; i < video.length; i++){

        //console.log(video[i]['video_id']);
        result+='"'+video[i]['video_id']+'"';

        
    }
r
	result+="]";*/

	var result = [];
	for (var i = 0;i<video.length;i++){
		result.push(video[i]['video_id']); 
	}

	//​var myString1 = strin(result);

//   result+=result.slice(0,-2);
   //result = ["5bjf9K9_kg4"];

console.log(result);


	
	$('#playlist-horizontal').append(' <script type="text/javascript" src="/packages/perfect-scrollbar/jquery.mousewheel.js"></script>');
    $('#playlist-horizontal').append('<script type="text/javascript" src="/packages/perfect-scrollbar/perfect-scrollbar.js"></script>');
    $('#playlist-horizontal').append('<script type="text/javascript" src="js/youtube-video-player.jquery.js"></script>');

	$(document).ready(function() {		
		//alert(result);	
		$("#playlist-horizontal").youtube_video({
			//playlist: 'PLLnpHn493BHECNl9I8gwos-hEfFrer7TV',
			//videoId: "JSTdArrLaCo", 
			videos: result,
			max_results: 5,
			pagination: true,
			continuous: true,
			first_video: 0,
			show_playlist: 'auto',
			playlist_type: 'vertical',
			show_channel_in_playlist:true,
			show_channel_in_title: false,
			width: 1348,
			show_annotations: false,
			now_playing_text: 'Now Playing',
			load_more_text: 'Load More',
			autoplay: false,
			force_hd: false,
			hide_youtube_logo: false,
			play_control: true,
			time_indicator: 'full',
			volume_control: true,
			share_control: true,
			fwd_bck_control: true,
			youtube_link_control: true,
			fullscreen_control: true,
			playlist_toggle_control:true,
			volume: false,
			show_controls_on_load: true,
			show_controls_on_pause: true,
			show_controls_on_play: false,
			player_vars: {},
			colors: {
				'controls_bg': 'rgba(0,0,0,.9)'
			},
		});
	});




}




Template.homepage.rendered= function(){

	
		$('.owl-prev').hide();
		


		setTimeout(function(){ 

			$("#Home-hero").owlCarousel({
				nav:false,
				dots:true,
				items :1,
				slideSpeed : 300,		
				paginationSpeed : 400,
				singleItem:true,
				autoPlay: true
				
		    });

		 }, 500);


		setTimeout(function(){ 




		 $(".owl-carousel").on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
		if (!event.namespace) return;
		var carousel = event.relatedTarget,
			element = event.target,
			current = carousel.current();
		$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
		$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
	  	});

			$("#comm-slider").owlCarousel({
				items : 4,
				center:true, 
				nav:true,
				dots:true,
				margin: 30,
				singleItem:false,
				autoPlay: false,
				responsive:{
					0:{
						items:1,
					},
					480:{
						items:2,
					},
					768:{
						items:3,
					},
					769:{
						items:4,
					}
				}
				
		      });

		 }, 700);
	
	


}




Template.browsevideos.rendered= function(){

	
	function onAddTag(tag) {
			alert("Added a tag: " + tag);
		}
		function onRemoveTag(tag) {
			alert("Removed a tag: " + tag);
		}

		function onChangeTag(input,tag) {
			alert("Changed a tag: " + tag);
		}





	
	$('#tags_1').tagsInput({
				'min-height':'50px',
				'height':'auto',
			    'width':'540px',
				'interactive':true,
			   'defaultText':'add a tag',
			   'delimiter': [',',';'],   // Or a string with a single delimiter. Ex: ';'
			   'removeWithBackspace' : true,
			   'minChars' : 0,
			   'maxChars' : 0, // if not provided there is no limit
			   'placeholderColor' : '#c4c4c4'
			});
}


  Template.uploadvideos.rendered= function(){
	
  	//$('#videoupload').append('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>');
 	//$('.post-sign-in').hide();
	 $('#videoupload').append('<script src="//apis.google.com/js/client:plusone.js"></script>');
	 $('#videoupload').append('<script src="//apis.google.com/js/client:plusone.js"></script>');
	 $("#videoupload").append($.getScript("js/cors_upload.js"));
	 $("#videoupload").append($.getScript("js/upload_video.js"));

	 $(document).ready(function() {
   		$("#selectseason").prop('disabled', 'disabled');
	});

	

	$('.addd-link-text').hide();
	$('.addlink-toggal a').click(function() {
		$(this).parent().parent().find('.addd-link-text').slideToggle('');
	  });	



	$('#selectseason').on('change', function() {
  				
  				var selectshowvalue=$("select#selectshow option").filter(":selected").val();
  				
  				if(this.value=='addnewseason'){	



  				
  					var seasouncount = Season.find({show_id:selectshowvalue}).count();

  					//{show_id:this.value}	
  					if(seasouncount==0 || seasouncount=='0'){

  							Season.insert({
								season_title:'season 1',
						     show_id:selectshowvalue,
								createdAt: new Date()
							});
  					}else{

  						Season.insert({
								season_title:'season '+parseInt(seasouncount+1),
						     	show_id:selectshowvalue,
								createdAt: new Date()
							});

  					}
  					Session.set("templateName", "uploadvideos");

		  					$('#selectseason option').removeAttr('selected').filter('[value=0]').attr('selected', true);


  				}

		});


	$('#selectshow').on('change', function() {

		if(this.value=='0' || this.value==0){


				$("#selectseason").prop('disabled', 'disabled');
		
		}else{

				$("#selectseason").removeAttr("disabled");

				

					$("#selectseason option").hide();
					$('#selectseason option[value="0"]').show();
					$('#selectseason option[value="addnewseason"]').show();
				 	var result = Season.find({show_id:this.value}).fetch();
				
					result.forEach(function(item) {
					    

					    $('#selectseason option[value="'+item._id+'"]').show();
					    

					});

		}

	});





	 $(document).on("click","#submitinsertbuttonid",function() {
      
	 			var selectshowvalue=$("select#selectshow option").filter(":selected").val();
	 			var selectseasonvalue=$("select#selectseason option").filter(":selected").val();
	 			
				Videomaster.insert({
					video_id:$("#video-id").text(),
					video_title:$("#title").val(),
					video_description:$("#description").val(),
					show_id:selectshowvalue,
					season_id:selectseasonvalue,
					show_home:0,
					cover_image:'',
					upload_from:0,
					createdAt: new Date()
				});

				Session.set("templateName", "uploadvideos");

    });


$(document).on("click","#addshow",function() { 

		var showtitle=$("#showtitle").val();
		var showdescription = $("#showdescription").val();
		var showdirector = $("#showdirector").val().replace(/,,;/g , ',');
		var showactor = $("#showactor").val().replace(/,,;/g , ',');
		var showcategory = $("#showcategory").val().replace(/,,;/g , ',');


			Show.insert({
					showtitle:showtitle,
					showdescription:showdescription,
					showdirector:showdirector,
					showactor:showactor,
					showcategory:showcategory,
					createdAt: new Date()
				});
		console.log('insertrd');
		$(".closePop").trigger('click');
		Session.set("templateName", "uploadvideos");

		$('#selectshow option').removeAttr('selected').filter('[value=0]').attr('selected', true);

 });
	 

$('.inputmulti').tagsInput({
				'min-height':'50px',
				'height':'auto',
			    'width':'540px',
				'interactive':true,
			   'defaultText':'add a tag',
			   'delimiter': [',',';'],   // Or a string with a single delimiter. Ex: ';'
			   'removeWithBackspace' : true,
			   'minChars' : 0,
			   'maxChars' : 0, // if not provided there is no limit
			   'placeholderColor' : '#c4c4c4'
			});

	$("div#dropzone").dropzone({ url: "/file/post" });


		// Popup funcion
	$('.poptrigger').click( function(){
		popID = $(this).attr('data-rel');
		$('#' + popID).fadeIn();
		var popMargTop = ($('#' + popID).height()) / 2;
		var popMargLeft = ($('#' + popID).width()) / 2;
		$('#main').addClass('blur');
		$('body').append("<div id='fade'></div>");
		$('#fade').fadeTo("slow", 0.15);
		return false;
	});
	// Close Popup Script
	$(document).on("click",".closePop, #fade", function(){
	$('#main').removeClass('blur');
	$('.pop-upbox').fadeOut( function(){
		$('#fade').fadeOut( function(){
			$(this).remove();
		});
	});
	return false;
	});
	
	// Out side click close Popup Script
	$(document).on('click', function(event) {
	if ($(event.target).has('.popup-box').length) {
			$('#main').removeClass('blur');
			$('.pop-upbox').fadeOut( function(){
			$('#fade').fadeOut( function(){
				$(this).remove();
			});
		});
	}
	});	
	
}
