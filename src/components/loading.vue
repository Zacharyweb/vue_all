<template>
	<div class="loading" v-show="ajaxing">
		<div class="loading-inner">
            <!-- <div class="loading-ico"></div> -->
            <p>
            	<span class="odd-text">L</span>
            	<span class="even-text">o</span>
            	<span class="odd-text">a</span>
            	<span class="even-text">d</span>
            	<span class="odd-text">i</span>
            	<span class="even-text">n</span>
            	<span class="odd-text">g</span>
            	<span class="even-text">.</span>
            	<span class="odd-text">.</span>
            	<span class="even-text">.</span>
            </p>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	computed: mapState({
      ajaxing: state => state.ajaxing
    }),
}	
</script>
<style scoped>
    .loading{
        position: fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        background-color: rgba(0,0,0,0);
        z-index: 100;
    }
    .loading-inner{
        position: absolute;
        top:45%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding:0.25rem 0.3rem 0.15rem;
        border-radius:0.16rem;
        background-color: rgba(255,255,255,0.8);
    }
    .loading-inner .loading-ico{
        height:1.2rem;
        background:url(~images/loadding.jpg) no-repeat center 0;
        background-size:1.2rem 1.2rem;
    }
   
    .loading-inner p{
        font-weight: bold;
        font-size: 0.3rem;
        padding-top: 0.2rem;
        width: auto;
        text-align: center;
        display: block;
        zoom: 1;
    }
    .loading-inner p:after {
         font-size: 0;
         display: block;
         visibility: hidden;
         clear: both;
         height: 0;
         content: ' ';
    }
    .loading-inner .odd-text{
        color: #bfd94f;
        transform: translateY(-30%);
        animation:textJump 1s infinite;  
        -webkit-animation:textJump 1s infinite; 
        float: left; 

    }
    .loading-inner .even-text{
        color: #ff667c;
        transform: translateY(0);
        animation:textJump 1s infinite 0.1s;  
        -webkit-animation:textJump 1s infinite 0.1s;  
        float: left; 
    }
    @-webkit-keyframes textJump{  
        0%{  
            transform: translateY(-50%);
        }  
        20%{  
            transform: translateY(-60%);  
        }  
        50%{  
            transform: translateY(-50%);  
        }  
        80%{  
            transform: translateY(-10%);       
        }  
        100%{  
            transform: translateY(0%);  
        }  
    } 
    @keyframes textJump{  
        0%{  
            transform: translateY(-20%);
        }  
        20%{  
            transform: translateY(-60%);  
        }  
        50%{  
            transform: translateY(-50%);  
        }  
        80%{  
            transform: translateY(-10%);       
        }  
        100%{  
            transform: translateY(0%);  
        }  
    }         
</style>