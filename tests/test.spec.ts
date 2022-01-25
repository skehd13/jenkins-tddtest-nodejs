import request from "supertest";
import { expect } from "chai";

import app from "../src/server/server";

// describe("GET /", () => {
//   it('"hello world" 텍스트를 받아야와야함', done => {
//     request(app)
//       .get("/")
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           done(err);
//           return;
//         }

//         expect(res.text).to.equal("hello world");
//         done();
//       });
//   });
// });

describe("회원가입", () => {
  const newUserData = {
    id: Math.random().toString(36).substr(2, 7),
    email: Math.random().toString(36).substr(2, 7) + "@" + Math.random().toString(36).substr(2, 7) + ".com",
    name: "test",
    password: Math.random().toString(36).substr(2, 7),
    age: Math.floor(Math.random() * 100)
  };
  it("아이디가 있는지 확인", done => {
    request(app)
      .get("/user")
      .send(newUserData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body.result).to.true;
        done();
      });
  });
  it("계정생성", done => {
    request(app)
      .post("/user")
      .send(newUserData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const data: any[] = res.body.users;
        const idData = data.map(r => ({
          id: r.id
        }));
        expect(res.body.result).to.true;
        expect(idData).to.deep.include({ id: newUserData.id });
        done();
      });
  });
});

describe("로그인 처리", () => {
  const userData = {
    email: "test@test.com",
    password: "1234",
    name: "테스트",
    id: "1cVf3e",
    age: 29
  };

  it("프로필정보를 받아와야함", done => {
    request(app)
      .get("/users")
      .expect(200)
      .end((err, res: request.Response) => {
        if (err) {
          done(err);
          return;
        }
        const data: any[] = res.body;
        const emailData = data.map(r => ({
          email: r.email
        }));
        expect(emailData).to.deep.include({ email: userData.email });
        expect(res.body).to.length.gt(0);
        done();
      });
  });
  it("로그인 처리", done => {
    request(app)
      .post("/login")
      .send({
        email: userData.email,
        password: userData.password
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body).to.be.haveOwnProperty("token");
        done();
      });
  });
});
/**
 * Given: 유저의 email는 test@test.com, 패스워드는 1234이다.
 * When: 유저가 주어진 아이디와 패스워드로 로그인 요청을 보냈다면
 * Then: 로그인이 성공했다고 알리고, 토큰을 부여한다.
 *
 * When: 유저가 잘못된 아이디와 패스워드로 로그인 요청을 보냈다면
 * Then: 로그인이 실패했다고 알린다.
 */
describe("로그인BDD", () => {
  describe("로그인", () => {
    //Given
    const email = "test@test.com";
    const password = "1234";

    //When
    context("정상 이메일/패스워드", () => {
      // Then
      it("로그인성공시 토큰을 부여", async () => {
        return request(app)
          .post("/login")
          .send({ email, password })
          .expect(200)
          .then(response => {
            expect(response.body).to.be.haveOwnProperty("token");
          })
          .catch(error => {
            throw error;
          });
      });
    });
    //When
    context("틀린 이메일/패스워드", () => {
      //Then
      it("401리턴시", async () => {
        return request(app).post("/login").send({ id: "qwer", password: "zxcv" }).expect(401);
      });
    });
  });
});

/**
 * Given: 새로운 유저는 email 형식체크 및 중복확인이 필요하다
 * When: 유저가 이메일 형식을 맞추지않고 보냈다면
 * Then: 이메일 형식을 확인해달라고 알린다.
 *
 * When: 유저가 이메일 형식을 맞추고 현재 DB에 없는 email을 보냈다면
 * Then: 사용가능한 아이디라고 알린다.
 *
 * When: 유저가 이메일 형식을 맞추고 현재 DB에 있는 email을 보냈다면
 * Then: 사용 불가능한 아이디라고 알린다.
 */
describe("회원가입BDD", () => {
  describe("이메일 중복확인", () => {
    //Given
    const notEmail = "cdscc1cf23fd";
    const notDBEmail = "test2@test2.com";
    const useDBEmail = "test@test.com";
    const emailValidation = (str: string) => {
      const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return reg.test(str);
    };
    //When
    context("유저가 이메일 형식을 맞추지않고 보냈다", () => {
      //Then
      it("이메일 정규식으로 확인", () => {
        return expect(emailValidation(notEmail)).to.false;
      });
    });

    //When
    context("유저가 이메일 형식을 맞추고 현재 DB에 없는 email을 보냈다", () => {
      it("사용가능한 이메일 알림", () => {
        return request(app)
          .get("/user")
          .query({ email: notDBEmail })
          .expect(200)
          .then(response => {
            expect(response.body.result).to.be.true;
          })
          .catch(error => {
            throw error;
          });
      });
    });

    //When
    context("유저가 이메일 형식을 맞추고 현재 DB에 있는 email을 보냈다", () => {
      it("사용불가 이메일 알림", () => {
        return request(app)
          .get("/user")
          .query({ email: useDBEmail })
          .expect(200)
          .then(response => {
            expect(response.body.result).to.be.false;
          })
          .catch(error => {
            throw error;
          });
      });
    });
  });
});
