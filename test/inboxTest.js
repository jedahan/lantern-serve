process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const should = require("should");
const fetch = require("node-fetch");
const conf = require("./testConf");

describe("inbox", () => {


    const postMessage = (data) => {
        return fetch(conf.URI + "/api/inbox", {
                method: "POST",  
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }) 
    }

    it("should ignore empty message", (done) => {
            postMessage({"no": "message"})
            .then(response => response.json())
            .then((json) => {
                json.ok.should.equal(false);
                done();
            });
    });

    it("should discard a malformed message", (done) => {
            postMessage({"message": "bad message!!"})
            .then(response => response.json())
            .then((json) => {
                json.ok.should.equal(false);
                done();
            });
    });

    it("should process a well-formed add message", (done) => {
            postMessage({"message": `1|${conf.PKG}+test`})
            .then(response => response.json())
            .then((json) => {
                // could be true or false depending if we added this already
                should.exist(json.ok);
                done();
            });
    });

    it("should process a well-formed update message", (done) => {
            postMessage({"message": `2|${conf.PKG}^test.me=yes`})
            .then(response => response.json())
            .then((json) => {
                json.ok.should.equal(true);
                done();
            });
    });


    it("should reject a key for unknown item", (done) => {
            postMessage({"message": `3|${conf.PKG}^should.not=exist`})
            .then(response => response.json())
            .then((json) => {
                json.ok.should.equal(false);
                done();
            });
    });

    after((done) => {
        // clean up the existing node we created
        postMessage({"message": `4|${conf.PKG}-test`})
        .then(response => response.json())
        .then((json) => {
            json.ok.should.equal(true);
            // lists past messages from inbox
            fetch(conf.URI + "/api/inbox", {
                    method: "GET",  
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.json())
                .then((json) => {
                    json.messages.length.should.be.aboveOrEqual(3);
                    console.log(json.messages);
                    done();
                });
        });
    });
});