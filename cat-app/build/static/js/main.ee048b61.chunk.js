(this["webpackJsonpcat-app"] = this["webpackJsonpcat-app"] || []).push([
  [0],
  {
    47: function (t, e, n) {},
    82: function (t, e, n) {},
    95: function (t, e, n) {
      "use strict";
      n.r(e);
      var a = n(0),
        c = n(13),
        r = n.n(c),
        s = n(22),
        i = (n(82), n(5)),
        o = (n(47), n(34)),
        u = n(8),
        l = n.n(u),
        j = n(12),
        d = n(125),
        b = n(2),
        h = function (t) {
          return Object(b.jsx)(d.a, {
            onClick: function () {
              t.onClick(t.item);
            },
            children: "Edit",
          });
        },
        O = function (t) {
          return Object(b.jsx)(d.a, {
            onClick: function () {
              t.onClick(t.id);
            },
            children: t.name,
          });
        },
        f = n(135),
        m = function (t) {
          var e = Object(a.useState)(!1),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            s = Object(a.useState)(t.text),
            o = Object(i.a)(s, 2),
            u = o[0],
            l = o[1],
            j = "true" === localStorage.getItem("admin"),
            h = localStorage.getItem("id");
          return Object(b.jsxs)("div", {
            children: [
              c
                ? Object(b.jsxs)("div", {
                    children: [
                      ""
                        .concat(void 0 !== t.user && t.user.firstName, " ")
                        .concat(void 0 !== t.user && t.user.lastName, ":"),
                      Object(b.jsx)(f.a, {
                        type: "text",
                        placeholder: String(t.text),
                        onChange: function (t) {
                          l(t.target.value);
                        },
                      }),
                      Object(b.jsx)(d.a, {
                        onClick: function () {
                          t.edit(t.id, u), r(!1);
                        },
                        children: "Submit Changes",
                      }),
                      Object(b.jsx)(d.a, {
                        onClick: function () {
                          r(!1);
                        },
                        children: "Cancel",
                      }),
                    ],
                  })
                : Object(b.jsx)("div", {
                    children: ""
                      .concat(void 0 !== t.user && t.user.firstName, " ")
                      .concat(
                        void 0 !== t.user && t.user.lastName,
                        ": \n                            "
                      )
                      .concat(t.text),
                  }),
              (j || String(t.userId) === h) &&
                Object(b.jsxs)("div", {
                  children: [
                    Object(b.jsx)(O, {
                      onClick: function () {
                        return t.delete(t.id);
                      },
                      name: "Delete",
                    }),
                    Object(b.jsx)(O, {
                      onClick: function () {
                        r(!0);
                      },
                      name: "Edit",
                    }),
                  ],
                }),
            ],
          });
        },
        x = function (t) {
          var e = Object(a.useState)(""),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            s = Object(a.useState)([]),
            u = Object(i.a)(s, 2),
            h = u[0],
            O = u[1],
            x = t.imageId;
          Object(a.useEffect)(
            function () {
              return O(h.concat(t.array));
            },
            [t.array]
          );
          var p = function (t, e) {
              t.preventDefault();
              var n = localStorage.getItem("token"),
                a = localStorage.getItem("id");
              fetch("".concat("http://localhost:8080", "/comments"), {
                method: "POST",
                headers: new Headers({
                  Authorization: "Bearer ".concat(n),
                  "Content-type": "application/json",
                }),
                body: JSON.stringify({ userId: a, imageId: e, text: c }),
              }).then(
                (function () {
                  var t = Object(j.a)(
                    l.a.mark(function t(e) {
                      return l.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                200 !== e.status &&
                                  alert(
                                    ""
                                      .concat(e.status, ": ")
                                      .concat(e.statusText)
                                  ),
                                (t.t0 = O),
                                (t.t1 = h),
                                (t.next = 5),
                                e.json()
                              );
                            case 5:
                              (t.t2 = t.sent),
                                (t.t3 = t.t1.concat.call(t.t1, t.t2)),
                                (0, t.t0)(t.t3);
                            case 8:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    })
                  );
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })()
              );
            },
            v = function (t) {
              fetch(
                "".concat("http://localhost:8080", "/comments/id/").concat(t),
                {
                  method: "DELETE",
                  headers: new Headers({
                    Authorization: "Bearer ".concat(
                      localStorage.getItem("token")
                    ),
                  }),
                }
              ).then(
                (function () {
                  var e = Object(j.a)(
                    l.a.mark(function e(n) {
                      var a;
                      return l.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (200 === n.status) {
                                e.next = 10;
                                break;
                              }
                              return (
                                (e.t0 = alert),
                                (e.t1 = "".concat(n.status, ": ")),
                                (e.next = 5),
                                n.text()
                              );
                            case 5:
                              (e.t2 = e.sent),
                                (e.t3 = e.t1.concat.call(e.t1, e.t2)),
                                (0, e.t0)(e.t3),
                                (e.next = 12);
                              break;
                            case 10:
                              (a = h.filter(function (e) {
                                return e.id !== t;
                              })),
                                O(a);
                            case 12:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              );
            },
            g = function (t, e) {
              var n = localStorage.getItem("id");
              fetch(
                "".concat("http://localhost:8080", "/comments/id/").concat(t),
                {
                  method: "PUT",
                  headers: new Headers({
                    Authorization: "Bearer ".concat(
                      localStorage.getItem("token")
                    ),
                    "Content-Type": "application/json",
                  }),
                  body: JSON.stringify({ text: e, userId: n }),
                }
              ).then(
                (function () {
                  var e = Object(j.a)(
                    l.a.mark(function e(n) {
                      return l.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((e.t0 = 200 !== n.status), !e.t0)) {
                                e.next = 9;
                                break;
                              }
                              return (
                                (e.t1 = alert),
                                (e.t2 = "".concat(n.status, ": ")),
                                (e.next = 6),
                                n.text()
                              );
                            case 6:
                              (e.t3 = e.sent),
                                (e.t4 = e.t2.concat.call(e.t2, e.t3)),
                                (0, e.t1)(e.t4);
                            case 9:
                              fetch(
                                ""
                                  .concat(
                                    "http://localhost:8080",
                                    "/comments/id/"
                                  )
                                  .concat(t)
                              ).then(
                                (function () {
                                  var e = Object(j.a)(
                                    l.a.mark(function e(n) {
                                      var a, c;
                                      return l.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (e.next = 2), n.json();
                                            case 2:
                                              (a = e.sent),
                                                (c = []),
                                                h.map(function (e) {
                                                  e.id === t
                                                    ? c.push(
                                                        Object(o.a)(
                                                          Object(o.a)({}, e),
                                                          {},
                                                          { text: a.text }
                                                        )
                                                      )
                                                    : c.push(e);
                                                }),
                                                O(c);
                                            case 6:
                                            case "end":
                                              return e.stop();
                                          }
                                      }, e);
                                    })
                                  );
                                  return function (t) {
                                    return e.apply(this, arguments);
                                  };
                                })()
                              );
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              );
            };
          return Object(b.jsx)("div", {
            children: Object(b.jsxs)("div", {
              children: [
                h.map(function (e) {
                  return Object(a.createElement)(
                    m,
                    Object(o.a)(
                      Object(o.a)({}, e),
                      {},
                      {
                        key: "C".concat(e.id),
                        delete: v,
                        edit: g,
                        loginStatus: t.loginStatus,
                      }
                    )
                  );
                }),
                t.loginStatus &&
                  Object(b.jsxs)("form", {
                    onSubmit: function (t) {
                      return p(t, x);
                    },
                    children: [
                      Object(b.jsx)(f.a, {
                        label: "Compose a Comment",
                        onChange: function (t) {
                          r(t.target.value);
                        },
                        onKeyDown: function (t) {
                          return (
                            (n = x), void ("Enter" === (e = t).key && p(e, n))
                          );
                          var e, n;
                        },
                      }),
                      Object(b.jsx)(d.a, {
                        type: "submit",
                        onClick: function (t) {
                          return p(t, x);
                        },
                        children: "Submit",
                      }),
                    ],
                  }),
              ],
            }),
          });
        },
        p = function (t) {
          var e = t.id,
            n = t.title,
            c = t.url,
            r = Object(a.useState)(c),
            s = Object(i.a)(r, 2),
            o = s[0],
            u = s[1],
            h = Object(a.useState)(n),
            O = Object(i.a)(h, 2),
            m = O[0],
            x = O[1];
          return Object(b.jsx)("div", {
            className: "modal",
            children: Object(b.jsxs)("form", {
              children: [
                Object(b.jsx)(f.a, {
                  label: "Title",
                  variant: "outlined",
                  onChange: function (t) {
                    x(t.target.value);
                  },
                }),
                Object(b.jsx)(f.a, {
                  label: "Url",
                  variant: "outlined",
                  onChange: function (t) {
                    u(t.target.value);
                  },
                }),
                Object(b.jsx)(d.a, {
                  onClick: function () {
                    var n = localStorage.getItem("token"),
                      a = localStorage.getItem("id");
                    fetch(
                      ""
                        .concat("http://localhost:8080", "/images/id/")
                        .concat(e),
                      {
                        method: "PUT",
                        headers: {
                          "Content-type": "application/json",
                          Authorization: "Bearer ".concat(n),
                        },
                        body: JSON.stringify({ title: m, url: o, userId: a }),
                      }
                    ).then(
                      (function () {
                        var e = Object(j.a)(
                          l.a.mark(function e(n) {
                            return l.a.wrap(function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    t.func({
                                      res: n,
                                      newTitle: m,
                                      newUrl: o,
                                      changed: !0,
                                    });
                                  case 1:
                                  case "end":
                                    return e.stop();
                                }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    );
                  },
                  children: "Submit",
                }),
                Object(b.jsx)(d.a, {
                  onClick: function () {
                    t.func({ changed: !1 });
                  },
                  children: "Cancel",
                }),
              ],
            }),
          });
        },
        v = function (t) {
          var e = Object(a.useState)(""),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            s = Object(a.useState)([]),
            o = Object(i.a)(s, 2),
            u = o[0],
            d = o[1],
            f = Object(a.useState)([]),
            m = Object(i.a)(f, 2),
            v = m[0],
            g = m[1],
            S = Object(a.useState)(!1),
            w = Object(i.a)(S, 2),
            k = w[0],
            y = w[1],
            C = Object(a.useState)(null),
            N = Object(i.a)(C, 2),
            I = N[0],
            E = N[1],
            T = Object(a.useState)(t.loginStatus),
            L = Object(i.a)(T, 2),
            P = L[0],
            U = L[1],
            A = Object(a.useState)(!1),
            B = Object(i.a)(A, 2),
            D = B[0],
            F = B[1],
            J = Object(a.useState)(!1),
            z = Object(i.a)(J, 2),
            H = z[0],
            R = z[1],
            M = Object(a.useState)(t.url),
            V = Object(i.a)(M, 2),
            W = V[0],
            K = V[1],
            q = Object(a.useState)(t.title),
            G = Object(i.a)(q, 2),
            Q = G[0],
            X = G[1],
            Y = "true" === localStorage.getItem("admin"),
            Z = localStorage.getItem("id");
          Object(a.useEffect)(
            function () {
              U(t.loginStatus);
            },
            [t.loginStatus]
          );
          var $ = function () {
            fetch(
              "".concat("http://localhost:8080", "/likes/imageId/").concat(t.id)
            ).then(
              (function () {
                var t = Object(j.a)(
                  l.a.mark(function t(e) {
                    var n;
                    return l.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.next = 2), e.json();
                          case 2:
                            (n = t.sent).length > 0 &&
                              (d(n),
                              null !== localStorage.getItem("id") &&
                                n.map(function (t) {
                                  String(t.userId) ===
                                    String(localStorage.getItem("id")) &&
                                    (y(!0), E(t));
                                }));
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()
            );
          };
          Object(a.useEffect)(function () {
            fetch(
              ""
                .concat("http://localhost:8080", "/comments/imageId/")
                .concat(t.id)
            ).then(
              (function () {
                var t = Object(j.a)(
                  l.a.mark(function t(e) {
                    var n;
                    return l.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.next = 2), e.json();
                          case 2:
                            (n = t.sent).length > 0 && g(n);
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()
            );
          }, []),
            Object(a.useEffect)($, []);
          var _ = (function () {
            var t = Object(j.a)(
              l.a.mark(function t(e) {
                var n;
                return l.a.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if ((R(!1), !e.changed)) {
                          t.next = 7;
                          break;
                        }
                        return (t.next = 4), e.res.json();
                      case 4:
                        (n = t.sent),
                          r(String(n)),
                          200 === Number(e.res.status) &&
                            (e.newTitle !== Q && X(e.newTitle),
                            e.newUrl !== W && K(e.newUrl));
                      case 7:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
          return Object(b.jsxs)("div", {
            children: [
              Object(b.jsx)("img", { src: W, alt: Q }, t.id),
              Y || String(t.userId) === Z
                ? Object(b.jsxs)("div", {
                    id: "button-bar",
                    children: [
                      Object(b.jsx)(O, {
                        id: t.id,
                        onClick: t.delete,
                        name: "Delete",
                      }),
                      Object(b.jsx)(h, {
                        item: t,
                        onClick: function () {
                          R(!0);
                        },
                      }),
                      H &&
                        Object(b.jsx)(p, {
                          id: t.id,
                          title: Q,
                          url: W,
                          func: _,
                        }),
                      k
                        ? Object(b.jsx)(O, {
                            id: null === I || void 0 === I ? void 0 : I.id,
                            onClick: function (t) {
                              fetch(
                                ""
                                  .concat("http://localhost:8080", "/likes/id/")
                                  .concat(t),
                                {
                                  method: "DELETE",
                                  headers: new Headers({
                                    Authorization: "Bearer ".concat(
                                      localStorage.getItem("token")
                                    ),
                                  }),
                                }
                              ).then(
                                (function () {
                                  var e = Object(j.a)(
                                    l.a.mark(function e(n) {
                                      var a;
                                      return l.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (200 === n.status) {
                                                e.next = 6;
                                                break;
                                              }
                                              return (
                                                (e.t0 = alert),
                                                (e.next = 4),
                                                n.json()
                                              );
                                            case 4:
                                              (e.t1 = e.sent), (0, e.t0)(e.t1);
                                            case 6:
                                              (a = u.filter(function (e) {
                                                return e.id !== t;
                                              })),
                                                d(a),
                                                !1,
                                                y(false);
                                            case 10:
                                            case "end":
                                              return e.stop();
                                          }
                                      }, e);
                                    })
                                  );
                                  return function (t) {
                                    return e.apply(this, arguments);
                                  };
                                })()
                              );
                            },
                            name: "Unlike",
                          })
                        : Object(b.jsx)(O, {
                            id: t.id,
                            onClick: function (t) {
                              var e = String(localStorage.getItem("id"));
                              fetch(
                                "".concat("http://localhost:8080", "/likes"),
                                {
                                  method: "POST",
                                  headers: new Headers({
                                    Authorization: "Bearer ".concat(
                                      localStorage.getItem("token")
                                    ),
                                    "Content-Type": "application/json",
                                  }),
                                  body: JSON.stringify({
                                    userId: e,
                                    imageId: t,
                                  }),
                                }
                              ).then(
                                (function () {
                                  var t = Object(j.a)(
                                    l.a.mark(function t(e) {
                                      return l.a.wrap(function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (200 === e.status) {
                                                t.next = 6;
                                                break;
                                              }
                                              return (
                                                (t.t0 = alert),
                                                (t.next = 4),
                                                e.json()
                                              );
                                            case 4:
                                              (t.t1 = t.sent), (0, t.t0)(t.t1);
                                            case 6:
                                              y(!0), $();
                                            case 8:
                                            case "end":
                                              return t.stop();
                                          }
                                      }, t);
                                    })
                                  );
                                  return function (e) {
                                    return t.apply(this, arguments);
                                  };
                                })()
                              );
                            },
                            name: "Like",
                          }),
                      Object(b.jsx)("div", { children: c }),
                    ],
                  })
                : null,
              u.length > 0 &&
                Object(b.jsx)("div", {
                  onMouseEnter: function () {
                    F(!0);
                  },
                  onMouseLeave: function () {
                    F(!1);
                  },
                  children: D
                    ? Object(b.jsx)("div", {
                        children: Object(b.jsxs)("ul", {
                          children: [
                            u.map(function (t) {
                              var e, n;
                              return Object(b.jsx)(
                                "li",
                                {
                                  style: { listStyle: "none" },
                                  children: ""
                                    .concat(
                                      null === (e = t.user) || void 0 === e
                                        ? void 0
                                        : e.firstName,
                                      " "
                                    )
                                    .concat(
                                      null === (n = t.user) || void 0 === n
                                        ? void 0
                                        : n.lastName
                                    ),
                                },
                                "like-user-".concat(t.userId)
                              );
                            }),
                            "liked this image",
                          ],
                        }),
                      })
                    : Object(b.jsxs)("div", {
                        children: [
                          u.length,
                          " ",
                          u.length > 1 ? "Likes" : "Like",
                        ],
                      }),
                }),
              Object(b.jsx)(x, { array: v, imageId: t.id, loginStatus: P }),
            ],
          });
        },
        g = function (t) {
          var e = Boolean(t.value),
            n = Object(a.useState)([{ id: 0, title: "", url: "" }]),
            c = Object(i.a)(n, 2),
            r = c[0],
            s = c[1],
            u = Object(a.useState)(""),
            h = Object(i.a)(u, 2),
            O = h[0],
            m = h[1],
            x = Object(a.useState)(""),
            p = Object(i.a)(x, 2),
            g = p[0],
            S = p[1],
            w = Object(a.useState)(""),
            k = Object(i.a)(w, 2),
            y = k[0],
            C = k[1],
            N = Object(a.useState)(!1),
            I = Object(i.a)(N, 2),
            E = I[0],
            T = I[1],
            L = function () {
              var t = "".concat("http://localhost:8080", "/images/all"),
                e = [];
              fetch(t)
                .then(function (t) {
                  return t.json();
                })
                .then(function (t) {
                  t.forEach(function (t) {
                    e.push(t);
                  }),
                    s(e);
                })
                .catch(function (t) {
                  return console.error(t);
                });
            },
            P = function () {
              T(!E);
            },
            U = function (t) {
              var e = "Bearer ".concat(localStorage.getItem("token"));
              if (
                window.confirm("Are you sure you want to delete this image?")
              ) {
                var n = ""
                  .concat("http://localhost:8080", "/images/id/")
                  .concat(t);
                fetch(n, {
                  method: "DELETE",
                  headers: new Headers({ Authorization: e }),
                }).then(
                  (function () {
                    var e = Object(j.a)(
                      l.a.mark(function e(n) {
                        var a, c;
                        return l.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.next = 2), n.json();
                              case 2:
                                (a = e.sent),
                                  alert(a),
                                  200 === n.status &&
                                    ((c = r.filter(function (e) {
                                      return e.id !== t;
                                    })),
                                    s(c));
                              case 5:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t) {
                      return e.apply(this, arguments);
                    };
                  })()
                );
              }
            };
          return (
            Object(a.useEffect)(L, []),
            Object(b.jsxs)("div", {
              children: [
                Object(b.jsxs)("div", {
                  children: [
                    e &&
                      Object(b.jsx)(d.a, {
                        onClick: P,
                        children: "Post New Image",
                      }),
                    E &&
                      Object(b.jsxs)("div", {
                        id: "post-form",
                        children: [
                          Object(b.jsx)(f.a, {
                            id: "title",
                            label: "title",
                            onChange: function (t) {
                              S(t.target.value);
                            },
                          }),
                          Object(b.jsx)(f.a, {
                            id: "url",
                            label: "url",
                            onChange: function (t) {
                              m(t.target.value);
                            },
                          }),
                          Object(b.jsx)(d.a, {
                            onClick: function () {
                              var t = localStorage.getItem("token"),
                                e = localStorage.getItem("id");
                              fetch(
                                "".concat("http://localhost:8080", "/images"),
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-type": "application/json",
                                    Authorization: "Bearer ".concat(t),
                                  },
                                  body: JSON.stringify({
                                    title: g,
                                    url: O,
                                    userId: e,
                                  }),
                                }
                              ).then(
                                (function () {
                                  var t = Object(j.a)(
                                    l.a.mark(function t(e) {
                                      return l.a.wrap(function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              return (
                                                (t.t0 = C),
                                                (t.next = 3),
                                                e.json()
                                              );
                                            case 3:
                                              (t.t1 = t.sent),
                                                (0, t.t0)(t.t1),
                                                T(!1),
                                                L();
                                            case 7:
                                            case "end":
                                              return t.stop();
                                          }
                                      }, t);
                                    })
                                  );
                                  return function (e) {
                                    return t.apply(this, arguments);
                                  };
                                })()
                              );
                            },
                            children: "Post",
                          }),
                          Object(b.jsx)(d.a, {
                            onClick: P,
                            children: "Cancel",
                          }),
                        ],
                      }),
                    Object(b.jsx)("div", { children: y }),
                  ],
                }),
                Object(b.jsx)("div", {
                  id: "image-grid",
                  children: r.map(function (t) {
                    return (
                      "" !== t.title &&
                      Object(a.createElement)(
                        v,
                        Object(o.a)(
                          Object(o.a)({}, t),
                          {},
                          { key: t.id, loginStatus: e, delete: U }
                        )
                      )
                    );
                  }),
                }),
              ],
            })
          );
        },
        S = n(131),
        w = n(132),
        k = n(98),
        y = n(133),
        C = n(42),
        N = n.n(C),
        I = n(41),
        E = n.n(I),
        T = n(14),
        L = function (t) {
          var e = Object(a.useState)(""),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            o = Object(a.useState)(""),
            u = Object(i.a)(o, 2),
            h = u[0],
            O = u[1],
            m = Object(a.useState)(""),
            x = Object(i.a)(m, 2),
            p = x[0],
            v = x[1],
            g = Object(a.useState)(!0),
            C = Object(i.a)(g, 2),
            I = C[0],
            L = C[1],
            P = Object(T.e)();
          return Object(b.jsxs)("div", {
            children: [
              Object(b.jsx)(S.a, {
                position: "static",
                style: { background: "#61dafb" },
                children: Object(b.jsx)(w.a, {
                  style: { flex: 1 },
                  children: Object(b.jsx)(k.a, {
                    variant: "h3",
                    children: "Login",
                  }),
                }),
              }),
              Object(b.jsxs)("form", {
                noValidate: !0,
                onSubmit: function (e) {
                  e.preventDefault();
                  var n = "".concat("http://localhost:8080", "/login");
                  fetch(n, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ username: c, password: h }),
                  }).then(
                    (function () {
                      var e = Object(j.a)(
                        l.a.mark(function e(n) {
                          var a;
                          return l.a.wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (401 !== n.status) {
                                    e.next = 8;
                                    break;
                                  }
                                  return (e.t0 = v), (e.next = 4), n.json();
                                case 4:
                                  (e.t1 = e.sent),
                                    (0, e.t0)(e.t1),
                                    (e.next = 17);
                                  break;
                                case 8:
                                  return (
                                    v("Successfully logged in!"),
                                    (e.next = 11),
                                    n.json()
                                  );
                                case 11:
                                  (a = e.sent),
                                    localStorage.setItem("id", a.userId),
                                    localStorage.setItem("admin", a.admin),
                                    localStorage.setItem("token", a.token),
                                    void 0 !== t.onChange && t.onChange(!0),
                                    P.push("/");
                                case 17:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function (t) {
                        return e.apply(this, arguments);
                      };
                    })()
                  );
                },
                children: [
                  Object(b.jsxs)("div", {
                    id: "grid",
                    children: [
                      Object(b.jsxs)("div", {
                        id: "textboxes",
                        children: [
                          Object(b.jsx)(f.a, {
                            id: "username",
                            label: "Username",
                            variant: "outlined",
                            onChange: function (t) {
                              r(t.target.value);
                            },
                          }),
                          Object(b.jsx)(f.a, {
                            id: "password",
                            label: "Password",
                            variant: "outlined",
                            type: I ? "password" : "text",
                            onChange: function (t) {
                              O(t.target.value);
                            },
                          }),
                        ],
                      }),
                      Object(b.jsxs)("div", {
                        id: "column2",
                        children: [
                          Object(b.jsx)("div", { id: "empty" }),
                          Object(b.jsx)("div", {
                            children: Object(b.jsx)(y.a, {
                              onClick: function () {
                                L(!I);
                              },
                              children: I
                                ? Object(b.jsx)(E.a, {})
                                : Object(b.jsx)(N.a, {}),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(b.jsx)(d.a, { type: "submit", children: "Submit" }),
                ],
              }),
              Object(b.jsx)("div", { children: p }),
              Object(b.jsx)(s.b, {
                to: "/signup",
                children: Object(b.jsx)(d.a, { children: "Sign Up" }),
              }),
            ],
          });
        },
        P = n(129),
        U = n(130),
        A = n(137),
        B = n(134),
        D = n(136),
        F = function (t) {
          var e = t.id,
            n = t.username,
            c = t.password,
            r = t.firstName,
            s = t.lastName,
            o = t.admin,
            u = Object(a.useState)(n),
            h = Object(i.a)(u, 2),
            O = h[0],
            m = h[1],
            x = Object(a.useState)(c),
            p = Object(i.a)(x, 2),
            v = p[0],
            g = p[1],
            S = Object(a.useState)(""),
            w = Object(i.a)(S, 2),
            k = (w[0], w[1]),
            C = Object(a.useState)(r),
            I = Object(i.a)(C, 2),
            T = I[0],
            L = I[1],
            F = Object(a.useState)(s),
            J = Object(i.a)(F, 2),
            z = J[0],
            H = J[1],
            R = Object(a.useState)(!0),
            M = Object(i.a)(R, 2),
            V = M[0],
            W = M[1],
            K = Object(a.useState)(""),
            q = Object(i.a)(K, 2),
            G = q[0],
            Q = q[1],
            X = "";
          X = o ? "admin" : "standard";
          var Y = Object(a.useState)(X),
            Z = Object(i.a)(Y, 2),
            $ = Z[0],
            _ = Z[1],
            tt = Object(a.useState)(""),
            et = Object(i.a)(tt, 2),
            nt = et[0],
            at = et[1],
            ct = Object(a.useState)(!1),
            rt = Object(i.a)(ct, 2),
            st = rt[0],
            it = rt[1];
          return Object(b.jsxs)("div", {
            className: "modal",
            id: "modal-grid",
            children: [
              Object(b.jsx)("div", {
                id: "main-column",
                children: Object(b.jsxs)("form", {
                  children: [
                    Object(b.jsx)(f.a, {
                      label: "New Username",
                      variant: "outlined",
                      onChange: function (t) {
                        m(t.target.value);
                      },
                    }),
                    Object(b.jsx)(f.a, {
                      label: "Original Password",
                      variant: "outlined",
                      onChange: function (t) {
                        at(t.target.value);
                      },
                      type: V ? "password" : "text",
                    }),
                    Object(b.jsx)(f.a, {
                      label: "New Password",
                      variant: "outlined",
                      onChange: function (t) {
                        g(t.target.value);
                      },
                      type: V ? "password" : "text",
                    }),
                    Object(b.jsx)(f.a, {
                      label: "Re-enter New Password",
                      variant: "outlined",
                      onChange: function (t) {
                        k(t.target.value), it(t.target.value !== v);
                      },
                      type: V ? "password" : "text",
                    }),
                    st &&
                      Object(b.jsx)("div", {
                        children: "Passwords don't match",
                      }),
                    Object(b.jsx)(f.a, {
                      label: "New First Name",
                      variant: "outlined",
                      onChange: function (t) {
                        L(t.target.value);
                      },
                    }),
                    Object(b.jsx)(f.a, {
                      label: "New Last Name",
                      variant: "outlined",
                      onChange: function (t) {
                        H(t.target.value);
                      },
                    }),
                    Object(b.jsxs)(P.a, {
                      component: "fieldset",
                      children: [
                        Object(b.jsx)(U.a, {
                          component: "legend",
                          children: "Admin Status",
                        }),
                        Object(b.jsxs)(A.a, {
                          "aria-label": "admin-status",
                          name: "admin1",
                          value: $,
                          onChange: function (t) {
                            _(t.target.value);
                          },
                          children: [
                            Object(b.jsx)(B.a, {
                              value: "admin",
                              control: Object(b.jsx)(D.a, {}),
                              label: "Admin",
                            }),
                            Object(b.jsx)(B.a, {
                              value: "standard",
                              control: Object(b.jsx)(D.a, {}),
                              label: "Standard User",
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(b.jsx)(d.a, {
                      onClick: function () {
                        var a = localStorage.getItem("token");
                        fetch("".concat("http://localhost:8080", "/login"), {
                          method: "POST",
                          headers: { "Content-type": "application/json" },
                          body: JSON.stringify({ username: n, password: nt }),
                        }).then(
                          (function () {
                            var n = Object(j.a)(
                              l.a.mark(function n(r) {
                                var s, i;
                                return l.a.wrap(function (n) {
                                  for (;;)
                                    switch ((n.prev = n.next)) {
                                      case 0:
                                        if (200 === r.status) {
                                          n.next = 7;
                                          break;
                                        }
                                        return (n.next = 3), r.json();
                                      case 3:
                                        (s = n.sent), Q(s), (n.next = 10);
                                        break;
                                      case 7:
                                        (i = {}),
                                          (i =
                                            v === c
                                              ? {
                                                  username: O,
                                                  firstName: T,
                                                  lastName: z,
                                                  admin: "admin" === $,
                                                }
                                              : {
                                                  username: O,
                                                  password: v,
                                                  firstName: T,
                                                  lastName: z,
                                                  admin: "admin" === $,
                                                }),
                                          fetch(
                                            ""
                                              .concat(
                                                "http://localhost:8080",
                                                "/users/id/"
                                              )
                                              .concat(e),
                                            {
                                              method: "PUT",
                                              headers: {
                                                "Content-type":
                                                  "application/json",
                                                Authorization: "Bearer ".concat(
                                                  a
                                                ),
                                              },
                                              body: JSON.stringify(i),
                                            }
                                          ).then(
                                            (function () {
                                              var e = Object(j.a)(
                                                l.a.mark(function e(n) {
                                                  var a;
                                                  return l.a.wrap(function (e) {
                                                    for (;;)
                                                      switch (
                                                        (e.prev = e.next)
                                                      ) {
                                                        case 0:
                                                          return (
                                                            (a = n),
                                                            (e.t0 = alert),
                                                            (e.next = 4),
                                                            a.text()
                                                          );
                                                        case 4:
                                                          (e.t1 = e.sent.replace(
                                                            /"/g,
                                                            ""
                                                          )),
                                                            (0, e.t0)(e.t1),
                                                            t.func({
                                                              res: a,
                                                              newFirstName: T,
                                                              newLastName: z,
                                                              newAdminStatus: $,
                                                              newUsername: O,
                                                              changed: !0,
                                                            });
                                                        case 7:
                                                        case "end":
                                                          return e.stop();
                                                      }
                                                  }, e);
                                                })
                                              );
                                              return function (t) {
                                                return e.apply(this, arguments);
                                              };
                                            })()
                                          );
                                      case 10:
                                      case "end":
                                        return n.stop();
                                    }
                                }, n);
                              })
                            );
                            return function (t) {
                              return n.apply(this, arguments);
                            };
                          })()
                        );
                      },
                      disabled: st,
                      children: "Submit",
                    }),
                    Object(b.jsx)(d.a, {
                      onClick: function () {
                        t.func({ changed: !1 });
                      },
                      children: "Cancel",
                    }),
                    G,
                  ],
                }),
              }),
              Object(b.jsxs)("div", {
                id: "side-column",
                children: [
                  Object(b.jsx)(y.a, {
                    onClick: function () {
                      W(!V);
                    },
                    children: V
                      ? Object(b.jsx)(E.a, {})
                      : Object(b.jsx)(N.a, {}),
                  }),
                  Object(b.jsx)("div", {}),
                ],
              }),
            ],
          });
        },
        J = function (t) {
          var e = t.user,
            n = t.activeUser,
            c = t.deleteFunc,
            r = n === String(e.id),
            s = "true" === localStorage.getItem("admin"),
            o = Object(a.useState)(!1),
            u = Object(i.a)(o, 2),
            d = u[0],
            f = u[1],
            m = Object(a.useState)(e.firstName),
            x = Object(i.a)(m, 2),
            p = x[0],
            v = x[1],
            g = Object(a.useState)(e.username),
            S = Object(i.a)(g, 2),
            w = S[0],
            k = S[1],
            y = Object(a.useState)(e.lastName),
            C = Object(i.a)(y, 2),
            N = C[0],
            I = C[1],
            E = Object(a.useState)(e.admin),
            T = Object(i.a)(E, 2),
            L = T[0],
            P = T[1],
            U = (function () {
              var t = Object(j.a)(
                l.a.mark(function t(e) {
                  return l.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          f(!1),
                            e.changed &&
                              200 === Number(e.res.status) &&
                              (e.newFirstName !== p && v(e.newFirstName),
                              e.newLastName !== N && I(e.newLastName),
                              e.newUsername !== w && k(e.newUsername),
                              e.newAdminStatus !== L && P(e.newAdminStatus));
                        case 2:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              );
              return function (e) {
                return t.apply(this, arguments);
              };
            })();
          return Object(b.jsxs)("div", {
            className: r ? "active-user" : "inactive",
            children: [
              Object(b.jsx)("h2", { children: "".concat(p, " ").concat(N) }),
              Object(b.jsx)("h3", { children: w }),
              L
                ? Object(b.jsx)("h3", { children: "Admin" })
                : Object(b.jsx)("h3", { children: "Standard User" }),
              s || n === String(e.id)
                ? Object(b.jsxs)("div", {
                    children: [
                      Object(b.jsx)(O, {
                        id: e.id,
                        onClick: c,
                        name: "Delete",
                      }),
                      Object(b.jsx)(h, {
                        item: e,
                        onClick: function () {
                          f(!0);
                        },
                      }),
                    ],
                  })
                : null,
              d &&
                Object(b.jsx)("div", {
                  children: Object(b.jsx)(F, {
                    id: e.id,
                    username: w,
                    firstName: p,
                    lastName: N,
                    password: e.password,
                    admin: L,
                    func: U,
                  }),
                }),
            ],
          });
        },
        z = function (t) {
          var e = Object(a.useState)([]),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            s = Object(a.useState)(""),
            o = Object(i.a)(s, 2),
            u = o[0],
            d = o[1],
            h = function (t) {
              if (
                window.confirm("Are you sure you want to delete this user?")
              ) {
                var e = "Bearer ".concat(localStorage.getItem("token"));
                fetch("http://localhost:8080/users/id/".concat(t), {
                  method: "DELETE",
                  headers: new Headers({ Authorization: e }),
                }).then(
                  (function () {
                    var e = Object(j.a)(
                      l.a.mark(function e(n) {
                        var a;
                        return l.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.t0 = d), (e.next = 3), n.json();
                              case 3:
                                (e.t1 = e.sent),
                                  (0, e.t0)(e.t1),
                                  200 === n.status &&
                                    ((a = c.filter(function (e) {
                                      return e.id !== t;
                                    })),
                                    r(a));
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t) {
                      return e.apply(this, arguments);
                    };
                  })()
                );
              }
            };
          return (
            Object(a.useEffect)(function () {
              var t = "".concat("http://localhost:8080", "/users/all");
              fetch(t)
                .then(function (t) {
                  return t.json();
                })
                .then(function (t) {
                  r(t);
                })
                .catch(function (t) {
                  return console.error(t);
                });
            }, []),
            Object(b.jsxs)("div", {
              children: [
                Object(b.jsx)("ul", {
                  children: c.map(function (e) {
                    return Object(b.jsx)(
                      "li",
                      {
                        children: Object(b.jsx)(J, {
                          user: e,
                          activeUser: String(t.value),
                          deleteFunc: h,
                        }),
                      },
                      e.id
                    );
                  }),
                }),
                u,
              ],
            })
          );
        },
        H = function (t) {
          return Object(b.jsx)("div", {
            className: "title",
            children: Object(b.jsx)(S.a, {
              position: "static",
              style: { background: "#61dafb" },
              children: Object(b.jsxs)(w.a, {
                style: { flex: 1 },
                children: [
                  Object(b.jsx)(k.a, { variant: "h3", children: "CatBook" }),
                  Object(b.jsx)(s.c, {
                    exact: !0,
                    to: "/",
                    activeStyle: { fontWeight: "bold" },
                    className: "NavLink",
                    children: "Images",
                  }),
                  Object(b.jsx)(s.c, {
                    exact: !0,
                    to: "/users",
                    activeStyle: { fontWeight: "bold" },
                    className: "NavLink",
                    children: "Users",
                  }),
                  t.value
                    ? Object(b.jsx)(d.a, {
                        id: "headerBtn",
                        onClick: t.onChange,
                        children: "Logout",
                      })
                    : Object(b.jsx)(s.c, {
                        to: "/login",
                        children: Object(b.jsx)(d.a, {
                          id: "headerBtn",
                          children: "Login",
                        }),
                      }),
                ],
              }),
            }),
          });
        },
        R = function () {
          var t = Object(a.useState)(""),
            e = Object(i.a)(t, 2),
            n = e[0],
            c = e[1],
            r = Object(a.useState)(""),
            o = Object(i.a)(r, 2),
            u = o[0],
            h = o[1],
            O = Object(a.useState)(""),
            m = Object(i.a)(O, 2),
            x = m[0],
            p = m[1],
            v = Object(a.useState)(""),
            g = Object(i.a)(v, 2),
            S = g[0],
            w = g[1],
            k = Object(a.useState)(""),
            C = Object(i.a)(k, 2),
            I = C[0],
            T = C[1],
            L = Object(a.useState)(""),
            P = Object(i.a)(L, 2),
            U = P[0],
            A = P[1],
            B = Object(a.useState)(!0),
            D = Object(i.a)(B, 2),
            F = D[0],
            J = D[1];
          return Object(b.jsx)("div", {
            children: Object(b.jsxs)("form", {
              noValidate: !0,
              onSubmit: function (t) {
                t.preventDefault(),
                  A(u !== x ? "Error: Passwords do not match" : "");
                var e = "".concat("http://localhost:8080", "/users");
                fetch(e, {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                  body: JSON.stringify({
                    username: n,
                    password: u,
                    firstName: S,
                    lastName: I,
                  }),
                }).then(
                  (function () {
                    var t = Object(j.a)(
                      l.a.mark(function t(e) {
                        var n;
                        return l.a.wrap(function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (401 !== e.status) {
                                  t.next = 8;
                                  break;
                                }
                                return (t.t0 = A), (t.next = 4), e.json();
                              case 4:
                                (t.t1 = t.sent), (0, t.t0)(t.t1), (t.next = 16);
                                break;
                              case 8:
                                return (
                                  A("Successfully created user!"),
                                  (t.next = 11),
                                  e.json()
                                );
                              case 11:
                                (n = t.sent),
                                  console.log(n),
                                  localStorage.setItem("token", n.token),
                                  localStorage.setItem("id", n.userId),
                                  localStorage.setItem("admin", n.admin);
                              case 16:
                              case "end":
                                return t.stop();
                            }
                        }, t);
                      })
                    );
                    return function (e) {
                      return t.apply(this, arguments);
                    };
                  })()
                );
              },
              children: [
                Object(b.jsxs)("div", {
                  id: "grid",
                  children: [
                    Object(b.jsxs)("div", {
                      id: "textboxes",
                      children: [
                        Object(b.jsx)(f.a, {
                          id: "username",
                          label: "Username",
                          variant: "outlined",
                          onChange: function (t) {
                            c(t.target.value);
                          },
                        }),
                        Object(b.jsx)(f.a, {
                          id: "password",
                          label: "Password",
                          variant: "outlined",
                          type: F ? "password" : "text",
                          onChange: function (t) {
                            h(t.target.value);
                          },
                        }),
                        Object(b.jsx)(f.a, {
                          id: "confirm-password",
                          label: "Re-enter Password",
                          variant: "outlined",
                          type: F ? "password" : "text",
                          onChange: function (t) {
                            p(t.target.value);
                          },
                        }),
                        Object(b.jsx)(f.a, {
                          id: "first-name",
                          label: "First Name",
                          variant: "outlined",
                          onChange: function (t) {
                            w(t.target.value);
                          },
                        }),
                        Object(b.jsx)(f.a, {
                          id: "last-name",
                          label: "Last Name",
                          variant: "outlined",
                          onChange: function (t) {
                            T(t.target.value);
                          },
                        }),
                      ],
                    }),
                    Object(b.jsx)("div", {
                      id: "sign-up-column2",
                      children: Object(b.jsx)("div", {
                        children: Object(b.jsx)(y.a, {
                          onClick: function () {
                            J(!F);
                          },
                          children: F
                            ? Object(b.jsx)(E.a, {})
                            : Object(b.jsx)(N.a, {}),
                        }),
                      }),
                    }),
                  ],
                }),
                Object(b.jsx)("div", { children: U }),
                Object(b.jsx)(d.a, { type: "submit", children: "Submit" }),
                Object(b.jsx)(s.b, {
                  to: "/login",
                  children: Object(b.jsx)(d.a, { children: "Return to Login" }),
                }),
              ],
            }),
          });
        },
        M = function () {
          var t = localStorage.getItem("id");
          console.log(t);
          var e = Object(a.useState)(void 0 !== t && null !== t),
            n = Object(i.a)(e, 2),
            c = n[0],
            r = n[1],
            s = function (t) {
              r(t);
            };
          return Object(b.jsxs)("div", {
            className: "App",
            children: [
              Object(b.jsx)(H, {
                value: c,
                onChange: function () {
                  localStorage.removeItem("id"),
                    localStorage.removeItem("admin"),
                    localStorage.removeItem("token");
                  r(!1), console.log("logging out");
                },
              }),
              Object(b.jsx)(T.a, {
                exact: !0,
                path: "/",
                render: function () {
                  return Object(b.jsx)(g, { value: c });
                },
              }),
              Object(b.jsx)(T.a, {
                path: "/login",
                render: function () {
                  return Object(b.jsx)(L, { onChange: s });
                },
              }),
              Object(b.jsx)(T.a, {
                path: "/users",
                render: function () {
                  return Object(b.jsx)(z, { value: t });
                },
              }),
              Object(b.jsx)(T.a, { path: "/signup", component: R }),
            ],
          });
        },
        V = function (t) {
          t &&
            t instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 139))
              .then(function (e) {
                var n = e.getCLS,
                  a = e.getFID,
                  c = e.getFCP,
                  r = e.getLCP,
                  s = e.getTTFB;
                n(t), a(t), c(t), r(t), s(t);
              });
        };
      r.a.render(
        Object(b.jsx)(s.a, { children: Object(b.jsx)(M, {}) }),
        document.getElementById("root")
      ),
        V();
    },
  },
  [[95, 1, 2]],
]);
//# sourceMappingURL=main.ee048b61.chunk.js.map
