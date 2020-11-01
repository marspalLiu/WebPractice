package cc.mrbird.febs.web.domain;

import javax.persistence.*;

public class Sale {
    @Id
    @Column(name = "saleID")
    private Integer saleid;

    @Column(name = "userID")
    private Integer userid;

    /**
     * 标题
     */
    private String title;

    /**
     * 描述
     */
    private String description;

    @Column(name = "propertyRight")
    private Integer propertyright;

    @Column(name = "unitType")
    private String unittype;

    private String towards;

    private Integer floor;

    private String decoration;

    private Integer elevator;

    private Integer acreage;

    @Column(name = "totalPrice")
    private Integer totalprice;

    private String pic1;

    private String pic2;

    private String pic3;

    private String pic4;

    private String pic5;

    @Column(name = "create_at")
    private String createAt;

    @Column(name = "is_display")
    private Integer isDisplay;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Column(name = "is_saled")
    private Integer isSaled;

    @Column(name = "is_checked")
    private Integer isChecked;

    /**
     * @return saleID
     */
    public Integer getSaleid() {
        return saleid;
    }

    /**
     * @param saleid
     */
    public void setSaleid(Integer saleid) {
        this.saleid = saleid;
    }

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
     * 获取标题
     *
     * @return title - 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置标题
     *
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * 获取描述
     *
     * @return description - 描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置描述
     *
     * @param description 描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * @return propertyRight
     */
    public Integer getPropertyright() {
        return propertyright;
    }

    /**
     * @param propertyright
     */
    public void setPropertyright(Integer propertyright) {
        this.propertyright = propertyright;
    }

    /**
     * @return unitType
     */
    public String getUnittype() {
        return unittype;
    }

    /**
     * @param unittype
     */
    public void setUnittype(String unittype) {
        this.unittype = unittype == null ? null : unittype.trim();
    }

    /**
     * @return towards
     */
    public String getTowards() {
        return towards;
    }

    /**
     * @param towards
     */
    public void setTowards(String towards) {
        this.towards = towards == null ? null : towards.trim();
    }

    /**
     * @return floor
     */
    public Integer getFloor() {
        return floor;
    }

    /**
     * @param floor
     */
    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    /**
     * @return decoration
     */
    public String getDecoration() {
        return decoration;
    }

    /**
     * @param decoration
     */
    public void setDecoration(String decoration) {
        this.decoration = decoration == null ? null : decoration.trim();
    }

    /**
     * @return elevator
     */
    public Integer getElevator() {
        return elevator;
    }

    /**
     * @param elevator
     */
    public void setElevator(Integer elevator) {
        this.elevator = elevator;
    }

    /**
     * @return acreage
     */
    public Integer getAcreage() {
        return acreage;
    }

    /**
     * @param acreage
     */
    public void setAcreage(Integer acreage) {
        this.acreage = acreage;
    }

    /**
     * @return totalPrice
     */
    public Integer getTotalprice() {
        return totalprice;
    }

    /**
     * @param totalprice
     */
    public void setTotalprice(Integer totalprice) {
        this.totalprice = totalprice;
    }

    /**
     * @return pic1
     */
    public String getPic1() {
        return pic1;
    }

    /**
     * @param pic1
     */
    public void setPic1(String pic1) {
        this.pic1 = pic1 == null ? null : pic1.trim();
    }

    /**
     * @return pic2
     */
    public String getPic2() {
        return pic2;
    }

    /**
     * @param pic2
     */
    public void setPic2(String pic2) {
        this.pic2 = pic2 == null ? null : pic2.trim();
    }

    /**
     * @return pic3
     */
    public String getPic3() {
        return pic3;
    }

    /**
     * @param pic3
     */
    public void setPic3(String pic3) {
        this.pic3 = pic3 == null ? null : pic3.trim();
    }

    /**
     * @return pic4
     */
    public String getPic4() {
        return pic4;
    }

    /**
     * @param pic4
     */
    public void setPic4(String pic4) {
        this.pic4 = pic4 == null ? null : pic4.trim();
    }

    /**
     * @return pic5
     */
    public String getPic5() {
        return pic5;
    }

    /**
     * @param pic5
     */
    public void setPic5(String pic5) {
        this.pic5 = pic5 == null ? null : pic5.trim();
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
     * @return is_display
     */
    public Integer getIsDisplay() {
        return isDisplay;
    }

    /**
     * @param isDisplay
     */
    public void setIsDisplay(Integer isDisplay) {
        this.isDisplay = isDisplay;
    }

    /**
     * @return is_deleted
     */
    public Integer getIsDeleted() {
        return isDeleted;
    }

    /**
     * @param isDeleted
     */
    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    /**
     * @return is_saled
     */
    public Integer getIsSaled() {
        return isSaled;
    }

    /**
     * @param isSaled
     */
    public void setIsSaled(Integer isSaled) {
        this.isSaled = isSaled;
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
}