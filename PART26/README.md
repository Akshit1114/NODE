WILL USE AWS MACHINE TO RUN OUR PROJECT

(INITIALLY WE WERE RUNNING OUR APP ON LOCALHOST) WILL DEPLOY OUR PROJECT TO SOME OTHER MACHINE WHICH IS GIVEN BY AWS, AND THAT MACHINE IS A CENTRALIZED PLACE WHERE THE APPLICATION IS DEPLOYED, AND FROM THERE WE CAN RUN IT ALL OVER 

EC2 → ELASTIC COMPUTE

EC2 ALLOWS U TO CREATE A VIRTUAL MACHINE OR INSTANCE
Write the tag name or project name, and then we have to select the OS we need to run/use on the machine. Then select the instance type → for us, we're gonna go for free (for now), then let other options mostly untouched, but in key pair options, we have to make a key pair 
Write the secret name as per wise select RSA(by default), click create, and a PEM file will be created(PEM file is a kind of key for accessing the server).
bts: creating a new machine on the cloud with our selected os and will allow u to use that with pem file as a key of access

Now we need to connect to that machine (will give you different ways)
Go for SSH options to connect to the machine via the terminal
follow the instructions as per given
(changing the permission happens in the folder where the file is present [generally “downloads”] and then rn the next command in the same folder only)

Press (exit for logout)
this logins u into the machine and u enter into the terminal of that machine
Now we want to set up this machine so that we can run our project (like setting up NodeJS [go to node website copy the terminal command the “curl …..something”])
(1. get node(if doing from "nvm" then copy command "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash" hit enter and then exit terminal and re-enter again via ssh). 
2.Then install the exact version of noe u used in development not any diff, as it can cause error ex: nvm install v22.17.0
  )

now we need code : bring the code via github to the machine (do git clone,u will be asked username and password in password use token of github)

Now, first we will deploy the frontend project :
But how to run our project on the machine :
     -  on [localhost](http://localhost), we do npm run dev, but here we will first build the frontend (the build has to be performed on the AWS machine, catch : do npm i then npm run build)

(extra do → sudo apt update)

 will use nginx to host our front-end project (will install nginx then start and then enable it)  ⇒ sudo apt install nginx

now start nginx and then enable it: sudo systemctl start nginx

                                            sudo systemctl enable nginx

Copy code of dist(build file) folder onto (nginx http server) /var/www/html/

scp (copy) , -r (recursively)

sudo scp -r dist/* /var/www/html/

now if u go to aws and look for public ip of our machine or server and hit that on browser it should work but it will not bcoz aws blocks all ur port  [the http server (of nginx) is on port 80]
We need to expose port 80 on aws so will have to go to the security groups → inbound rules → to a edit → add port 80 and do 0.0.000 (something like this, this will allow u to access anywhere from internet)

### concept

### 💡 The "Aha!" Moment: `npm run dev` vs. Nginx

You've spotted the key difference between a **development environment** and a **production environment**.

### 1. The `npm run dev` Way (Development)

When you run `npm run dev`, you are starting a **special development web server** (like Webpack Dev Server).

- It runs **in memory**.
- It **watches your code** for changes.
- It **re-compiles** your React/TypeScript code *on the fly* every time you save a file.
- This is **slow, uses a lot of resources, and is only for development.**

### 2. The `build` + Nginx Way (Production)

This is a completely different process.

- **Step 1: `npm run build`**
This command does the compilation *one time*. It takes all your React and TypeScript code and crunches it down into a small folder (e.g., `dist` or `build`) containing just **plain, static HTML, CSS, and JavaScript files.**
- **Step 2: Pasting to `/var/www/html/`**
You are just moving those simple, static files to a folder on your server. At this point, **nothing is running.** The files are just sitting there, like documents in a filing cabinet.
- **Step 3: "When did the app run??"**
It *didn't!* **Nginx is the app that is running.**

Think of Nginx as a permanent, 24/7-on service that you started (probably with a command like `sudo systemctl start nginx`).

**Nginx's job is simple:**

1. It constantly **listens on Port 80**.
2. Its configuration file points to the `/var/www/html/` directory.
3. When a request hits Port 80, Nginx wakes up and says, "Aha! A request for the root `/` page."
4. It goes to `/var/www/html/`, grabs the `index.html` file, and sends its *text content* back to the user's browser.

The browser then receives that HTML, sees that it needs `main.js` and `styles.css`, and makes *new* requests for those files, which Nginx happily serves as well.

### analogy: The Chef vs. The Vending Machine

- **`npm run dev`** is a **personal chef** (the dev server) who cooks your meal (your app) live in your kitchen, letting you make changes instantly.
- **Nginx** is a **vending machine** (the Nginx server). The `build` files are the pre-packaged snacks inside. The vending machine is **always on** (the Nginx service is running). When you hit the IP (press a button), it just *serves* you the snack (the `index.html` file).

So, your React "app" isn't "running" on the server in the same way. The **web server (Nginx) is running**, and it is *serving* your app's static files.

Now we are gonna deploy backend :
so move to server folder , do npm i

then do npm start (npm run dev → locally)

now u might have problem connecting the db bcoz this machine is trying to connect with the db which might be not allowed in mongoDB so we need to set machine IP address at mongo DB

also aws machine should allow the (port expose of 3000) port we are using  for server to be avilable

And then it will run

but a problem is that u can’t just open ur terminal 24*7 , u need something to make this work
so we gonna use —> pm 2

so now install pm2 ⇒ npm i pm2 -g

now will do → npm start via pm2 

pm2 start npm  -- start (npm start == npm -- start <- script)

to check logs → pm2 logs

pm2 start —name “devTinder-backend" — startf
pm2 list, pm2  flush <name> ,pm2  stop <name>, pm2 delete <name>

currently things running here : 

Frontend ⇒ http: [//43.204.96.49/](https://43.204.96.49/)
Backend ⇒ http://43.204.96.49:3000

#now if u hit frontend will the profect work no

bcoz in our code we are requesting for [localhost:3000](http://localhost:3000) but we need to use the IP address of that machine + :3000

Frontend ⇒ http: [//43.204.96.49/](https://43.204.96.49/)  ⇒ devTinder.com
Backend ⇒ http://43.204.96.49:3000  ⇒  [devTinder.com:3000](http://devTinder.com:3000) (wrong not to use :3000)  [devTinder.com/api](http://devTinder.com/api) (coorect way /api)

will need to config nginx

when u hit a url it first taken/goes to nginx (that is why nginx can act as load balancer also)

[proxy pass] : now i need to tell (or write a configuration) nginx that whenever someone do [devTinder.com/api](http://devTinder.com/api)(internally → http: [//43.204.96.49/](https://43.204.96.49/)) map it to [devTinder.com:3000](http://devTinder.com:3000) ([http://43.204.96.49:3000](http://43.204.96.49:3000/))

so we need to config nginx : 

sudo nano /etc/nginx/sites-available/default

(to get root level permission) (to edit) (path of config file)

inside server { ——-

server_name [43.204.96.49](https://43.204.96.49/);

location /api/ {

    proxy_pass [http://localhost:3000/](http://localhost:5000/);   
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

}

-- —- - - —

}

restart nginx  → sudo systemctl restart nginx

modify the base url as /api in front end

then rebuild the app then again copy and paste to var/www/html and good to go

---

## 1. The Domain Registrar (The Landlord)

You are correct: Registrars (GoDaddy, Namecheap, Hostinger) are where you "lease" the name.

* **Refinement:** Think of the Registrar as the entity that tells the **Registry** (the master list for `.com`, `.org`, etc.) who is responsible for your domain.

## 2. Nameservers (The Signpost)

When you change the Nameservers at GoDaddy to Cloudflare’s (e.g., `ashley.ns.cloudflare.com`), you are effectively handing over the "Source of Truth" for your domain to Cloudflare.

* **Technical Detail:** This is called **Delegation**. Once you update nameservers, the Registrar no longer controls your DNS records; they only point the world to Cloudflare to ask for directions.

## 3. DNS Records (The Map)

This is where you define where specific traffic goes. Here is the breakdown of the records you mentioned:

| Record Type | What it does | Your Example |
| --- | --- | --- |
| **A Record** | Maps a Name to an **IPv4** address. | `devTinder.com`  `43.204.96.49` |
| **AAAA Record** | Maps a Name to an **IPv6** address. | (Cloudflare often handles this automatically) |
| **CNAME** | Maps a Name to **another Name** (Alias). | `www.devTinder.com`  `devTinder.com` |

---

## 4. What you missed (The "Pro" Knowledge)

### **A. The "Root" vs. "Subdomain" Rule**

In your notes, you said `www.devTinder.com` goes to `devTinder.com`.

* **The Technicality:** `devTinder.com` is the **Apex/Root domain**. `www` is a **subdomain**.
* **Cloudflare Magic:** Strictly speaking, the DNS spec doesn't allow a CNAME at the Root level (the apex). However, Cloudflare uses a feature called **CNAME Flattening** to make this work anyway. It’s one of the reasons using Cloudflare is better than using GoDaddy's default DNS.

### **B. TTL (Time To Live)**

You’ll see a "TTL" value next to your records.

* **What it is:** This tells other servers how long to "cache" (remember) your IP before asking Cloudflare for an update again.
* **Tip:** If you are about to change your IP address, lower the TTL to "Auto" or "1 min" a few hours before the move so the change happens instantly for users.

### **C. The "Proxy" Status (Cloudflare Specific)**

In Cloudflare, you will see an **Orange Cloud** icon.

* **Proxied (Orange):** Cloudflare hides your public IP (`43.204.96.49`). Users see Cloudflare's IP instead. This gives you DDoS protection and SSL.
* **DNS Only (Grey):** Users see your actual EC2 IP. Use this only if you have specific reasons (like SSH or non-web traffic).

### **D. Deleting Records**

You mentioned "delete other records."

* **Caution:** Be careful not to delete **MX Records**. These handle your email. If you delete them, you will stop receiving emails on that domain immediately.

---

## 5. Summary of the Flow

1. **Request:** User types `devTinder.com`.
2. **Lookup:** The browser asks the Root Registry  Registry points to **Cloudflare Nameservers**.
3. **Resolution:** Cloudflare looks at your **A Record** and says "Go to `43.204.96.49`."
4. **Connection:** The browser connects to your AWS EC2 instance.


