package cc.mrbird.febs.web.domain;

import javax.persistence.*;

@Table(name = "user")
public class User {
    @Id
    @Column(name = "userID")
    private Integer userid;

    @Column(name = "openID")
    private String openid;

    private String username;

    private String password;

    private String sex;

    private String realname;

    private Integer type;

    private String telephone;

    private String idcard;

    private String cardpic;

    private String avatar;

    @Column(name = "create_at")
    private String createAt;

    @Column(name = "is_checked")
    private Integer isChecked;

    /**
     * @return userID
     */
    public Integer getUserid() {
        return userid;
    }

    /**
     * @param userid
     */
    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    /**
     * @return openID
     */
    public String getOpenid() {
        return openid;
    }

    /**
     * @param openid
     */
    public void setOpenid(String openid) {
        this.openid = openid == null ? null : openid.trim();
    }

    /**
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username
     */
    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    /**
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * @return sex
     */
    public String getSex() {
        return sex;
    }

    /**
     * @param sex
     */
    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    /**
     * @return realname
     */
    public String getRealname() {
        return realname;
    }

    /**
     * @param realname
     */
    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    /**
     * @return type
     */
    public Integer getType() {
        return type;
    }

    /**
     * @param type
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * @return telephone
     */
    public String getTelephone() {
        return telephone;
    }

    /**
     * @param telephone
     */
    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    /**
     * @return idcard
     */
    public String getIdcard() {
        return idcard;
    }

    /**
     * @param idcard
     */
    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    /**
     * @return cardpic
     */
    public String getCardpic() {
        return cardpic;
    }

    /**
     * @param cardpic
     */
    public void setCardpic(String cardpic) {
        this.cardpic = cardpic == null ? null : cardpic.trim();
    }

    /**
     * @return avatar
     */
    public String getAvatar() {
        return avatar;
    }

    /**
     * @param avatar
     */
    public void setAvatar(String avatar) {
        this.avatar = avatar == null ? null : avatar.trim();
    }

    /**
     * @return create_at
     */
    public String getCreateAt() {
        return createAt;
    }

    /**
     * @param createAt
     */
    public void setCreateAt(String createAt) {
        this.createAt = createAt == null ? null : createAt.trim();
    }

    /**
     * @return is_checked
     */
    public Integer getIsChecked() {
        return isChecked;
    }

    /**
     * @param isChecked
     */
    public void setIsChecked(Integer isChecked) {
        this.isChecked = isChecked;
    }

    @Override
    public String toString() {
        return "User{" +
                "userid=" + userid +
                ", openid='" + openid + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", realname='" + realname + '\'' +
                ", type=" + type +
                ", telephone='" + telephone + '\'' +
                ", idcard='" + idcard + '\'' +
                ", cardpic='" + cardpic + '\'' +
                ", avatar='" + avatar + '\'' +
                ", createAt='" + createAt + '\'' +
                ", isChecked=" + isChecked +
                '}';
    }
}