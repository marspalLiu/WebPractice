package cc.mrbird.febs.web.controller;

import cc.mrbird.febs.common.exception.FebsException;
import cc.mrbird.febs.web.domain.Rent;
import cc.mrbird.febs.web.domain.Sale;
import cc.mrbird.febs.web.service.RentService;
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
@RequestMapping("RentController")
public class RentController {

    @Autowired
    private RentService rentService;

    @PostMapping("/addRent")
    public int addRent(@RequestBody Rent rent) throws FebsException {
        try{
            System.out.println(rent.toString());
            rent.setIsDeleted(0);
            rent.setCreateAt(String.valueOf(System.currentTimeMillis()));
            rent.setIsChecked(0);
            rent.setIsRented(0);
            rent.setIsDisplayed(0);
            return rentService.save(rent);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     *  @Author liuxin、zhukun
     *  筛选出审核通过，且没有租出去的房屋
     * */
    @GetMapping(value = "rentCheckedList")
    public List<Rent> querySaleCheckedList(@RequestParam Map<String,String> params) throws FebsException {
        try{
            Example example = new Example(Rent.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("isChecked",1);
            criteria.andEqualTo("isRented",0);
            for (String key:params.keySet()) {
                if (key.equals("title"))
                    criteria.andLike(key,params.get(key));
                else if (key.equals("type"))
                    continue;
                else if (key.equals("area"))
                    example.setOrderByClause("acreage " + params.get(key));
                else if (key.equals("price"))
                    example.setOrderByClause("price " + params.get(key));
                else
                    criteria.andEqualTo(key,params.get(key));
            }
            return rentService.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

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
     *  租房详情
     * */
    @GetMapping(value = "rentDetail")
    public List<Rent> querySaleDetail(@RequestParam int rentId) throws FebsException {
        try{
            Example example = new Example(Rent.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("rentid",rentId);
            return rentService.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     *  @Author liuxin
     *  删除某个租房信息
     * */
    @DeleteMapping(value = "deleteRent")
    public int deleteSale(@RequestParam int rentId) throws FebsException {
        try{
            return rentService.delete(rentId);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
     *  @Author liuxin
     *  更新某个租房信息
     * */
    @PutMapping(value = "updateSale")
    public int updateSale(@RequestBody Rent rent) throws FebsException {
        try{
            return rentService.updateNotNull(rent);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }



}
