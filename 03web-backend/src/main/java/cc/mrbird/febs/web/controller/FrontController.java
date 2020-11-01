package cc.mrbird.febs.web.controller;

import cc.mrbird.febs.common.exception.FebsException;
import cc.mrbird.febs.web.domain.Rent;
import cc.mrbird.febs.web.domain.Sale;
import cc.mrbird.febs.web.domain.User;
import cc.mrbird.febs.web.service.RentService;
import cc.mrbird.febs.web.service.SaleService;
import cc.mrbird.febs.web.service.UserService2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Example;

import java.util.List;
import java.util.Map;

@Slf4j
@Validated
@RestController
@RequestMapping("FrontController")
public class FrontController {
    @Autowired
    private RentService rentService;

    @Autowired
    private SaleService saleService;

    @Autowired
    private UserService2 userService2;

    /*
     *  @Author liuxin、zhukun
     *  筛选出正在审核且没有租出去的房屋
     * */
    @GetMapping(value = "rentCheckingList")
    public List<Rent> querySaleCheckingList() throws FebsException {
        try{
            Example example = new Example(Rent.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("isChecked",0);
            criteria.andEqualTo("isRented",0);
            return rentService.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     *  @Author liuxin
     *  更新某个租房信息
     * */
    @PutMapping(value = "updateRent")
    public int updateRent(@RequestParam int rentid, @RequestParam int isChecked) throws FebsException {
        try{
            Rent rent = new Rent();
            rent.setRentid(rentid);
            rent.setIsChecked(isChecked);
            return rentService.updateNotNull(rent);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     * @Author liuxin
     * 选出正在审核的房屋信息
     * */
    @PostMapping(value = "saleCheckingList")
    public List<Sale> querySaleCheckingList(@RequestBody Map<String,String> params) throws FebsException {
        try{
            Example example = new Example(Sale.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("is_checked",0);
            criteria.andEqualTo("is_saled",0);
            for (String key:params.keySet()) {
                if (!key.equals("title"))
                    criteria.andEqualTo(key,params.get(key));
                criteria.andLike(key,params.get(key));

            }
            return saleService.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     *  @Author liuxin
     *  更新某个售卖信息
     * */
    @PutMapping(value = "updateSale")
    public int updateSale(@RequestBody Sale sale) throws FebsException {
        try{
            return saleService.updateNotNull(sale);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
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
    public int checkUser(@RequestParam int userid, @RequestParam int isChecked){
        try {
            User user = new User();
            user.setIsChecked(isChecked);
            user.setUserid(userid);
            return userService2.updateNotNull(user);
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }


}
