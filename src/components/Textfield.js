import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function TextField() {

    useEffect(() => {
        loadMessages();
    })

    const textComponent = () => {
        return (
            <React.Fragment style={{ backgroundColor: '#b8b8b8'}}>
                <CssBaseline />
                <Container fixed>
                <Typography component="div" style={{ position: 'relative', backgroundColor: '#ffffff', height: '80vh', marginTop: '50px', boxShadow: '2px 2px 4px gray'}} >
                    <div id='messages' style={{overflow: 'scroll', height: '90%'}}></div>
                    <form  onSubmit={e => handleMessage(e)}style={{ position: 'absolute', bottom: '10px', width: '100%'}}>
                        <input id='nameInput' placeholder='name...' style={{width: '10%'}}></input>
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
        const nameInput = document.getElementById('nameInput');
        const user = firebase.auth().currentUser? firebase.auth().currentUser: {
            displayName: nameInput.value? nameInput.value: "匿名ユーザー",
            photoURL: 'https://img.icons8.com/ios/50/000000/saitama.png',
        };
        saveMessages(messageInput, user);
        loadMessages();  
        messageInput.value = "";
    }

    const saveMessages = (msgInp, user) => {
        if(msgInp.value !== '') {
            firebase.firestore().collection('messages').doc().set({
                name: user.displayName,
                message: msgInp.value,
                photoURL: user.photoURL,
                timestamp: new Date()
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });   
        }else{
            alert("メッセージを入力してください！！");
        } 
    }

    const loadMessages = () => {
        firebase.firestore().collection('messages').orderBy('timestamp')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                displayMessage( doc.id ,doc.data().name, doc.data().translated, doc.data().photoURL)
            });
          })
    }

    const displayMessage = ( id, name, transMsg, url) => {
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

        if (transMsg) {
            messageElement.textContent = `${transMsg.ja}
                                          ${transMsg.en}
                                          ${transMsg.zh}`;
            messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        }

        let element = document.getElementById('messages');
        let bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
    }

    const observeMessages = () => {
        firebase.firestore().collection("messages").orderBy('timestamp')
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                displayMessage(doc.id ,doc.data().name, doc.data().translated, doc.data().photoURL);
            });
        },function(error) {
            console.log(error);
        });
    }

    observeMessages();

    return (
        <div>
        { textComponent() }  
      </div>
    );
};