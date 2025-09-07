# This is the backend series of the Chai And Code
\



# process.exit(1)

**Definition**  
Ends the Node.js app immediately.  

**Exit Codes**  
- `0` → Success (normal exit)  
- `1` → Error (something failed)  

**Use in MongoDB**  
If the database connection fails, the app cannot continue.  
We exit with code `1` to stop the process.  

**Example**  
```js
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);   // stop app because DB failed
  });
--------------------------------------------------------------------------------------------

#mostly we use the app.use when we have to use the middlewares



// search for pre hook in teh middle ware in teh mongodb and alsoo for the ohter concepts of the mongoose aggregate pagginate -v2