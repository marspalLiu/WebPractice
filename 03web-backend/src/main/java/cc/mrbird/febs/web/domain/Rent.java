package cc.mrbird.febs.web.domain;

import javax.persistence.*;

public class Rent {
    @Id
    @Column(name = "rentID")
    private Integer rentid;

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

    @Column(name = "wholeRent")
    private Integer wholerent;

    @Column(name = "maxPeople")
    private Integer maxpeople;

    @Column(name = "unitType")
    private String unittype;

    private Integer floor;

    private Integer elevator;

    private Integer acreage;

    private Double price;

    /**
     * 合租要求（如合租，只要女生之类）
     */
    private String request;

    /**
     * 装修情况
     */
    private String decoration;

    /**
     * 家具家电情况
     */
    private String furniture;

    /**
     * 照片（包括户型图等）
     */
    private String pic1;

    private String pic2;

    private String pic3;

    private String pic4;

    private String pic5;

    @Column(name = "create_at")
    private String createAt;

    @Column(name = "is_displayed")
    private Integer isDisplayed;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @Column(name = "is_rented")
    private Integer isRented;

    @Column(name = "is_checked")
    private Integer isChecked;

    /**
     * @return rentID
     */
    public Integer getRentid() {
        return rentid;
    }

    /**
     * @param rentid
     */
    public void setRentid(Integer rentid) {
        this.rentid = rentid;
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
     * @return wholeRent
     */
    public Integer getWholerent() {
        return wholerent;
    }

    /**
     * @param wholerent
     */
    public void setWholerent(Integer wholerent) {
        this.wholerent = wholerent;
    }

    /**
     * @return maxPeople
     */
    public Integer getMaxpeople() {
        return maxpeople;
    }

    /**
     * @param maxpeople
     */
    public void setMaxpeople(Integer maxpeople) {
        this.maxpeople = maxpeople;
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
     * @return price
     */
    public Double getPrice() {
        return price;
    }

    /**
     * @param price
     */
    public void setPrice(Double price) {
        this.price = price;
    }

    /**
     * 获取合租要求（如合租，只要女生之类）
     *
     * @return request - 合租要求（如合租，只要女生之类）
     */
    public String getRequest() {
        return request;
    }

    /**
     * 设置合租要求（如合租，只要女生之类）
     *
     * @param request 合租要求（如合租，只要女生之类）
     */
    public void setRequest(String request) {
        this.request = request == null ? null : request.trim();
    }

    /**
     * 获取装修情况
     *
     * @return decoration - 装修情况
     */
    public String getDecoration() {
        return decoration;
    }

    /**
     * 设置装修情况
     *
     * @param decoration 装修情况
     */
    public void setDecoration(String decoration) {
        this.decoration = decoration == null ? null : decoration.trim();
    }

    /**
     * 获取家具家电情况
     *
     * @return furniture - 家具家电情况
     */
    public String getFurniture() {
        return furniture;
    }

    /**
     * 设置家具家电情况
     *
     * @param furniture 家具家电情况
     */
    public void setFurniture(String furniture) {
        this.furniture = furniture == null ? null : furniture.trim();
    }

    /**
     * 获取照片（包括户型图等）
     *
     * @return pic1 - 照片（包括户型图等）
     */
    public String getPic1() {
        return pic1;
    }

    /**
     * 设置照片（包括户型图等）
     *
     * @param pic1 照片（包括户型图等）
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
     * @return is_displayed
     */
    public Integer getIsDisplayed() {
        return isDisplayed;
    }

    /**
     * @param isDisplayed
     */
    public void setIsDisplayed(Integer isDisplayed) {
        this.isDisplayed = isDisplayed;
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
     * @return is_rented
     */
    public Integer getIsRented() {
        return isRented;
    }

    /**
     * @param isRented
     */
    public void setIsRented(Integer isRented) {
        this.isRented = isRented;
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
        return "Rent{" +
                "rentid=" + rentid +
                ", userid=" + userid +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", wholerent=" + wholerent +
                ", maxpeople=" + maxpeople +
                ", unittype='" + unittype + '\'' +
                ", floor=" + floor +
                ", elevator=" + elevator +
                ", acreage=" + acreage +
                ", price=" + price +
                ", request='" + request + '\'' +
                ", decoration='" + decoration + '\'' +
                ", furniture='" + furniture + '\'' +
                ", pic1='" + pic1 + '\'' +
                ", pic2='" + pic2 + '\'' +
                ", pic3='" + pic3 + '\'' +
                ", pic4='" + pic4 + '\'' +
                ", pic5='" + pic5 + '\'' +
                ", createAt='" + createAt + '\'' +
                ", isDisplayed=" + isDisplayed +
                ", isDeleted=" + isDeleted +
                ", isRented=" + isRented +
                ", isChecked=" + isChecked +
                '}';
    }
}