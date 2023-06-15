// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACvqI-HpTkXeFaFXl8g6N_rdyiq_-3m2A",
    authDomain: "blog-5bd22.firebaseapp.com",
    databaseURL: "https://blog-5bd22-default-rtdb.firebaseio.com",
    projectId: "blog-5bd22",
    storageBucket: "blog-5bd22.appspot.com",
    messagingSenderId: "719662770574",
    appId: "1:719662770574:web:d32618dcb96e03301c1cdf",
measurementId: "G-3VPNNG5YLP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

console.log("hey")
var db=firebase.database()
var i;

// now first fetch verything from the DB
function loader(){
    db.ref("id").once("value", (value) => {
        console.log(value.val())
        i=value.val().count
        load(i)
    })
    async function load(i){
        for(let k=i-1; k>=0; k--) {
            await db.ref('blog/' + k).once('value', (value) => {
                let t=value.val().Title
                let c=value.val().Content
                console.log(t + ' ' + c + ' ' + k)
                compo(t, c, k)
            })
        }
    }
}

function getId(){
    // get id count (new way)
    // var abc=db.ref('id/' + 'count')
    // abc.on('value', function(snapshot){
    //     i=snapshot.val()
    //     console.log(i)
    // })
    
    // get id(old way)
    db.ref("id").once("value", (value) => {
        console.log(value.val())
        i=value.val().count
        console.log(i)
        create(i);
    })
}
function create(i){
    console.log(i)
    // get input
    let content=document.getElementById("content").value
    let title=document.getElementById("title").value

    // check for empty value
    if(content=='' || title==''){
        window.alert("Please enter some value!")
        return
    }

    // set title & content
    db.ref('blog/' + i).set({
        Title: title,
        Content: content
    })
    
    // update id
    let updates={
        count: i+1
    }
    db.ref("id").update(updates)

    window.alert("Added!")
    location.reload()
}
function compo(t, c, i){
    var div=document.createElement('div');
    var h3=document.createElement('h3');
    var p=document.createElement('p');
    var button=document.createElement('button');
    div.id=i;
    h3.innerHTML='Title: ' + t;
    p.innerHTML='Content: ' + c.substring(0, 200) + '...';
    button.innerHTML='Read more...'
    button.onclick=function(){
        window.location.href='open.html?q=' + i
    }

    div.append(h3, p, button)
    document.getElementById('compo').appendChild(div)
}

function newLoader(){
    console.log('hey')
    // old way for query fetch
    // let url=location.href
    // let blogNumber=url.split('=')[1]

    // new way of query fetch
    const urlParams = new URLSearchParams(window.location.search);
    const blogNumber = urlParams.get('q');

    console.log(blogNumber)
    finalShow(blogNumber)
}
function finalShow(i){
    db.ref('blog/' + i).once('value', (value) =>{
        console.log(value.val())
        let t=value.val().Title
        let c=value.val().Content
        console.log(t+' '+c+' '+i)     
        last(t, c)
    })
}
function last(t, c){
    var div=document.createElement('div');
        var h3=document.createElement('h3');
        var p=document.createElement('p');
        div.id=i;
        h3.innerHTML='Title:'+ t;
        p.innerHTML='Content:'+ c;
        div.append(h3, p)
        document.getElementById('show').appendChild(div)
}
