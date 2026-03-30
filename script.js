//================== INIT ==================
pi.init({version:"2.0"});
let user = null;
let cart = [];

// ================== FIREBASE ==================

const firebaseConfig = (
  apiKay: "YOUR_API_KEY", 
  authDomain: 
  "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket:
  "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId:"XXXX"
  );
  
  // INIT FIREBASE 
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestorage();
  
  //================== LOGIN ==================
  async function login() {
    try { 
      const scopes = ['usernane','payment'];
      const auth = await
    pi.autheticate(scopes, 
    onIncompletePaymentFound);
    
    user = auth.user;
    document.getElementById("user").innerText
    welcome " + user.usernane;
    
    loadAds();
    
} catch (e) {
  console.Error(e);
}
}

//================== POST AD ==================
async function postAd() {
  const file = document.getElementById("image");
  const title = document.getElementById("title");
  const price =document.getElementById("price");
  
  if(!file || !title|| !price) {
    alert("fill all fields")
    return;
  }
  ,
  // UPLOAD IMAGE
  const storageRef = storage.ref("ads/" + Date)
  await storageRef.put(file);
  const imageUrl = await storageRef.getDownload
  
  // SAVE TO FIREBASE
  await db.collection("ads").add({
    title: title
    price: parseFloat(price),
    image: imageUrl,
    owner: user.usernane,
    createdAt: Date.now()
  });
  
  alert("advert posted!")
  loadAds();
}

//================== LOAD ADS ==================
async function loadAds() {
  const container = document.getElementById();
  container.innerHTML = "Loading...";
  
  const snapshot = await db.collection("ads")
  .orderBy("createdAt","desc")
  .get();
  
  container.innerHTML="";
  
  snapshot.forEach(doc => {
    const ad = doc.data():
    
    container.innerHTML +='
    <div class="card">
      <img src="π{ad.image}" style="width: 1.0"
      <h3>ad.title</h3>
      <p>π{ad.price} pi</p>
      <small>seller: π{ad.owner} </small><br
      <button onclick="addToart('π{doc.id}>
      Add to cart
      </button>
    </div>
    ';
    });
}

//================== CART ==================
function addToart(id, price, title) {
  
  
}

function renderCart() {
  const container = document.getElementById(")
  container.innerHTML = "";
  
  let total = 0;
  
  cart.forEach(item=> {
    container.innerHTML += <p>π{item.title}
    total+=item price;
    });
    
    document.getElementById+"total").innerText
    "total: " + total+ "pi"; 
    }
    
    //================== CHECKOUT ==================
    function checkout() {
      if (cart.length===0) {
        alert("cart empty"):
        return;
    }
    
  const total = cart.reduce((sum, i)=> sum
  
    pi.createPayment({
    amount: total,
    memo: "BINTUBE SERVICES Order"
    metadata: cart
    },{
    onReadyForserverApproval: (paymentId) =>
    console.log(paymentId);
    },
    
    onReadyForserverCompeletion: (paymentId, trns)
    alert("payment successful!");
    cart = [];
    renderCart();
    },
    
    onCancel: () => alert)("cancelled")
