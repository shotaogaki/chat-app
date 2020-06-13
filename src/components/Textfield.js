import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function TextField() {

    useEffect(() => {
        console.log('effe内');
        firebase.auth().onAuthStateChanged(user => { if(user) {
                loadMessages();
            }else {
                hideMessage();
                console.log("useeffect内")
            }
        });
    })

    const LoginedComponent = () => {
        return (
            <React.Fragment style={{ backgroundColor: '#b8b8b8'}}>
                <CssBaseline />
                <Container fixed>
                <Typography component="div" style={{ position: 'relative', backgroundColor: '#ffffff', height: '80vh', marginTop: '50px', boxShadow: '2px 2px 4px gray'}} >
                    <div id='messages' style={{overflow: 'scroll', height: '90%'}}></div>
                    <form  onSubmit={e => handleMessage(e)}style={{ position: 'absolute', bottom: '10px', width: '100%'}}>
                        <input id='messageInput' placeholder='messages...' style={{width: '60%'}}></input>
                        <button type='submit' id='msgSubmitBtn'>Send</button>
                    </form>
                </Typography>
                </Container>
          </React.Fragment>
        );
    };

    const handleMessage = (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const user = firebase.auth().currentUser;
        saveMessages(messageInput, user);
        loadMessages();  
        messageInput.value = "";
    }

    const saveMessages = (msgInp, user) => {
        if(user && msgInp.value !== '') {
            firebase.firestore().collection('messages').doc().set({
                name: user.displayName,
                message: msgInp.value,
                photoURL: user.photoURL,
                timestamp: new Date()
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });   
        }else if(user){
            alert("メッセージを入力してください！！");
        }else {
            alert("ログインしてください！！");
        }  
    }

    const loadMessages = () => {
        console.log('load内')
        firebase.firestore().collection('messages').orderBy('timestamp')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              displayMessage( doc.id ,doc.data().name, doc.data().message, doc.data().photoURL)
            });
          })
    }

    const displayMessage = ( id, name, message, url) => {
        const template =
            '<div style="display: flex; flex-direction: row; border-bottom: solid 1px #acacac">' +
                '<div>'+
                    '<img class="pic" style=" width: 30px; border-radius: 50%; margin-right: 10px;"/>'+
                '</div>' +
                '<div>'+
                '<div class="name" style=" font-size: 16px;text-align: start; line-height: 30px;"></div>'+
                '<div class="message" style="font-size: 24px; font-weight: bold; "></div>' +
                '</div>' +
            '</div>';
        let div = document.getElementById(id);

        if (!div) {
            let container = document.createElement('div');
            container.innerHTML = template;
            div = container.firstChild;
            div.setAttribute('id', id);
            document.getElementById('messages').appendChild(div);
        }

        if (url) {
            div.querySelector('.pic').setAttribute('src',`${url}`);
        }

        div.querySelector('.name').textContent = name;
        let messageElement = div.querySelector('.message');

        if (message) {
            messageElement.textContent = message;
            messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        }

        let element = document.getElementById('messages');
        var bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
    }

    //うまく作用しない
    const hideMessage = () => {
        document.getElementById('messages').innerHTML = "";
        console.log("hide内")
    }

    const observeMessages = () => {
        console.log('observe内')
        firebase.firestore().collection("messages").orderBy('timestamp')
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                displayMessage(doc.id ,doc.data().name, doc.data().message, doc.data().photoURL);
            });
        },function(error) {
            console.log(error);
            
        });
    }

    observeMessages();

    return (
        <div>
        { LoginedComponent() }  
      </div>
    );
};