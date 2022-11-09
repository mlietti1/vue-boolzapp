const {createApp} = Vue;

const DateTime = luxon.DateTime;

createApp({
  data(){
    return{
      chatCounter: 0,
      newMsgString: '',
      searchString: '',
      user: 
      {
        name: 'Cristina',
        avatar: '_io'
      },
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received',
              toggleShow: false
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.', 
              status: 'sent',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received',
              toggleShow: false
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Alessandro B.',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Alessandro L.',
          avatar: '_5',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Claudia',
          avatar: '_6',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received',
              toggleShow: false
            }
            ,{
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Federico',
          avatar: '_7',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received',
              toggleShow: false
            }
          ]
        },
        {
          name: 'Davide',
          avatar: '_8',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent',
              toggleShow: false
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received',
              toggleShow: false
            }
          ]
        }
      ]
    }
  },
  methods:{

    // funzione per aggiungere messsaggio alla chat
    createNewMsg(){
      if(!this.newMsgString) return;
      const newMsg = {
        date: this.getTime(),
        message: this.newMsgString,
        status: 'sent',
        toggleShow: false
      }
      this.contacts[this.chatCounter].messages.push(newMsg);
      
      setTimeout(() => {
        this.autoScroll();
      }, 10);

      this.newMsgString = '';
      this.autoreply = setTimeout(() => {
        this.getReplyMsg();        
      }, 1000);
      
    },

    // funzione per ricevere risposta automatica

    getReplyMsg(){
      const newReply = {
        date: this.getTime(),
        message: 'Ok!',
        status: 'received',
        toggleShow: false
      }
      this.contacts[this.chatCounter].messages.push(newReply);
      setTimeout(() => {
        this.autoScroll();
      }, 10);
      return newReply;

    },

    // funzione per mostrare i contatti trovati nel menu a sx, richiamo ogni volta che digito
    
    searchContact(){
      this.contacts.forEach(contact => {
        if(!contact.name.toLowerCase().includes(this.searchString.toLowerCase())){
          contact.visible = false;
        }else{
          contact.visible = true;
        }
      })
    },

    // funzione da richiamare per autoscroll della chat ogni volta che si aggiunge un messaggio

    autoScroll(){
      const convoContainer = document.getElementById('chat');
      return convoContainer.scrollTop = convoContainer.scrollHeight;
    },

    // richiamo funzione ogni volta che mi serve l'ora attuale

    getTime() {
      const now = DateTime.now();
      const currentTime = now.toFormat("dd'/'MM'/'yyyy hh':'mm':'ss");
      return currentTime;
    },

    toggleMenu(i, index){

      this.contacts[i].messages[index].toggleShow = !this.contacts[i].messages[index].toggleShow;

    }
    
  },
  mounted(){
    console.log('Vue montato');
  }
}).mount('#app')