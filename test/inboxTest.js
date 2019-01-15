process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const should = require("should");
const fetch = require("node-fetch");

describe("message", () => {

    let uri = "https://localhost:9443";

    const postMessage = (data) => {
        return fetch(uri + "/api/inbox", {
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
            postMessage({"message": "test@0.0.1+test"})
            .then(response => response.json())
            .then((json) => {
                // could be true or false depending if we added this already
                should.exist(json.ok);
                done();
            });
    });

    it("should process a well-formed update message", (done) => {
            postMessage({"message": "test@0.0.1^test.me=yes"})
            .then(response => response.json())
            .then((json) => {
                json.ok.should.equal(true);
                done();
            });
    });

    after((done) => {
        postMessage({"message": "test@0.0.1-test"})
        .then(response => response.json())
        .then((json) => {
            json.ok.should.equal(true);
            done();
        });
    })
});