package cc.mrbird.febs.web.controller;

import cc.mrbird.febs.common.domain.FebsResponse;
import cc.mrbird.febs.common.exception.FebsException;
import cc.mrbird.febs.web.domain.Sale;
import cc.mrbird.febs.web.domain.User;
import cc.mrbird.febs.web.service.SaleService;
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
@RequestMapping("SaleController")
public class SaleController {

    @Autowired
    private SaleService saleService;

//    @GetMapping(value = "addSale")
//    public FebsResponse addSale(int userID, int propertyRight, String unitType, String towards
//            , int floor, double totalPrice) throws FebsException {
//        try{
//            Sale sale=new Sale();
//            sale.setUserid(userID);
//            sale.setPropertyright(propertyRight);
//            sale.setUnittype(unitType);
//            sale.setTowards(towards);
//            sale.setFloor(floor);
//            sale.setTotalprice((int) totalPrice);
//            sale.setCreateAt(String.valueOf(System.currentTimeMillis()));
//            sale.setIsDeleted(0);
//            sale.setIsSaled(0);
//            saleService.save(sale);
//            return new FebsResponse().data("success");
//        }catch (Exception e){
//            e.printStackTrace();
//            throw new FebsException("failed");
//        }
//    }

    @PostMapping(value = "addSale")
    public FebsResponse addSale(@RequestBody Sale sale) throws FebsException {
        try{
            sale.setCreateAt(String.valueOf(System.currentTimeMillis()));
            sale.setIsDeleted(0);
            sale.setIsSaled(0);
            saleService.save(sale);
            return new FebsResponse().data("success");
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }
    /*
    *  @Author liuxin
    *  筛选出审核通过，且没有出售的房屋
    * */
    @GetMapping(value = "saleCheckedList")
    public List<Sale> querySaleCheckedList(@RequestParam Map<String,String> params) throws FebsException {
        try{
            Example example = new Example(Sale.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("isChecked",1);
            criteria.andEqualTo("isSaled",0);
            for (String key:params.keySet()) {
                if (key.equals("title"))
                    criteria.andLike(key,params.get(key));
                else if (key.equals("type"))
                    continue;
                else if (key.equals("area"))
                    example.setOrderByClause("acreage " + params.get(key));
                else if (key.equals("price"))
                    example.setOrderByClause("totalPrice " + params.get(key));
                else
                    criteria.andEqualTo(key,params.get(key));
            }
            return saleService.selectByExample(example);
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
    *  售卖详情
    * */
    @GetMapping(value = "saleDetail")
    public List<Sale> querySaleDetail(@RequestParam int saleId) throws FebsException {
        try{
            Example example = new Example(Sale.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andEqualTo("saleid",saleId);
            return saleService.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            throw new FebsException("failed");
        }
    }

    /*
    *  @Author liuxin
    *  删除某个售卖信息
    * */
    @DeleteMapping(value = "deleteSale")
    public int deleteSale(@RequestParam int saleId) throws FebsException {
        try{
            return saleService.delete(saleId);
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

}
