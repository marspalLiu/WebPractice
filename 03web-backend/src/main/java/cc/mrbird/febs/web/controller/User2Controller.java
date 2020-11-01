package cc.mrbird.febs.web.controller;

import cc.mrbird.febs.common.controller.BaseController;
import cc.mrbird.febs.common.domain.FebsConstant;
import cc.mrbird.febs.common.domain.FebsResponse;
import cc.mrbird.febs.common.exception.FebsException;
import cc.mrbird.febs.common.utils.HttpUtil;
import cc.mrbird.febs.web.domain.User;
import cc.mrbird.febs.web.service.UserService2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Slf4j
@Validated
@RestController
@RequestMapping("UserController")
public class User2Controller extends BaseController {

    @Autowired
    private UserService2 userService2;

    @Value("uploadPath")
    public static String UPLOAD_PATH = "C:/Users/liuxi/Desktop/findhourse";

    /*
     *  @author liuxin
     *  获取微信的session_key 、openid等
     * */
    @GetMapping(value = "/getSessionKey")
    @PermitAll
    public FebsResponse getSessionKey(String code) throws FebsException {
        try {
            String data = HttpUtil.sendPost(FebsConstant.SESSION_KEY_URL, "appid=" + FebsConstant.APP_ID + "&secret="+FebsConstant.APP_SECRET+"&js_code="+ code + "&grant_type=authorization_code");
            return new FebsResponse().data(data);
        } catch (Exception e) {
            String message = "SessionKey查询失败";
            throw new FebsException(message);
        }
    }

    /*
     *  @author liuxin
     *  用户注册
     * */
    @PostMapping("/userRegister")
    public FebsResponse userRegister(@RequestBody User user) throws FebsException {
        try {
            Example example = new Example(User.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("openid",user.getOpenid());
            List<User> userList = userService2.selectByExample(example);
            if (userList.size() == 1){
                return new FebsResponse().data(userList.get(0));
            }else if (userList.size() == 0){
                user.setIsChecked(0);
                user.setCreateAt(String.valueOf(System.currentTimeMillis()));
                userService2.save(user);
                return new FebsResponse().data(user);
            }
            throw new FebsException("failed");
        }catch (Exception e){
            e.printStackTrace();
            String message = "注册失败！";
            throw new FebsException(message);
        }
    }

    /*
     *  @Author liuxin
     *  获取用户详细信息
     * */
    @GetMapping("getUserInfo")
    public FebsResponse getUserInfo(@RequestParam(value = "userId") String userId) throws FebsException {
        try {
            System.out.println(userId);
            return new FebsResponse().data(userService2.selectByKey(userId));
        }catch (Exception e){
            e.printStackTrace();
            String message = "获取详细信息失败！";
            throw new FebsException(message);
        }
    }

    /*
    *  @Author liuxin
    *  更新用户信息（未完成头像上传）
    * */
    @PostMapping("updateUserInfo")
    public FebsResponse updateUserInfo(
            @RequestBody User user,
            @RequestParam(value ="authPic", required = false) MultipartFile cardPic,
            HttpServletRequest request) throws FebsException {
        try {
            if (cardPic!=null && !cardPic.isEmpty()){
                String fileName = cardPic.getOriginalFilename();
                String filePath = UPLOAD_PATH;
                File dest = new File(filePath);
                try {
                    if (!dest.getParentFile().exists()) {
                        dest.getParentFile().mkdirs();// 新建文件夹
                    }
                    cardPic.transferTo(dest);
                    System.out.println("上传成功！");
                    return new FebsResponse().message("success").data(filePath+fileName);
                } catch (IOException e) {
                    System.out.println("上传异常！" + e);
                    throw new FebsException("上传异常！" + e);
                }
            }
            System.out.println(user);
            userService2.updateNotNull(user);
            return new FebsResponse().message("success").data(user);
        }catch (Exception e){
            e.printStackTrace();
            String message = "更新失败！";
            throw new FebsException(message);
        }
    }

    /****************************************** 后台管理端接口 *************************************************/

    @GetMapping("getCheckingList")
    public List<User> queryCheckeingList(){
        try {
            Example example = new Example(User.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("isChecked",1);
            return userService2.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("checkUser")
    public int checkUser(@RequestBody User user){
        try {
            return userService2.updateNotNull(user);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }



}