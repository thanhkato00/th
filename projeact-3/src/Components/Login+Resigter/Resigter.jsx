import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Resigter() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("ユーザー名を空白にすることはできません"),
      email: Yup.string()
        .email("無効なメール")
        .required("メールアドレスを空白にすることはできません"),
      password: Yup.string()
        .min(8, "パスワードは8文字以上である必要があります")
        .required("パスワードを空白にすることはできません"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("パスワード"), null], "パスワードが一致していません")
        .required("パスワードの確認を空にすることはできません"),
    }),
    onSubmit: (value) => {
      const url = "http://localhost:8000/user";
      axios
        .post(url, value)
        .then((res) => {
          toast.success("登録成功");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("登録失敗");
        });
    },
  });

  return (
    <div>
      <div className="main">
        <form
          method="POST"
          className="form"
          id="form-1"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="heading">新規会員登録</h3>
          <p className="desc">新しいメンバー大歓迎</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              ユーザー名
            </label>
            <input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="VD: Gojo Satoru"
              className="form-control"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="form-message">{formik.errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="VD: email@domain.com"
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="form-message">{formik.errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
            パスワード
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              placeholder="パスワード入力"
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="form-message">{formik.errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
            パスワード再入力
            </label>
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              placeholder="パスワード再入力"
              type="password"
              className="form-control"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="form-message">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>
          <button className="form-submit">登録</button>
          <div id="them">
            <span>すでにアカウントをお持ちですか </span>
            <span>
              <button onClick={() => navigate("/login")}>
              ここからサインインしてください！
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resigter;
