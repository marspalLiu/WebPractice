package cc.mrbird.febs.web.controller;

import cc.mrbird.febs.common.domain.FebsResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequestMapping("file")
public class FileController {

    @RequestMapping(value = "uploadFile", headers = ("content-type=multipart/*"), method = RequestMethod.POST)
    public FebsResponse uploadFile(@RequestParam("file") MultipartFile file){
        System.out.println("进入接口");
        if (file.isEmpty()) {
            return new FebsResponse().message("noFile");
        }
        String fileName = file.getOriginalFilename();
        String filePath = "C:/Users/liuxi/Desktop/upload/";
        File dest = new File(filePath);
        try {
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();// 新建文件夹
            }
            file.transferTo(dest);
            System.out.println("上传成功！");
            return new FebsResponse().message("success").data(filePath+fileName);
        } catch (IOException e) {
            System.out.println("上传异常！" + e);
            return new FebsResponse().message("");
        }
    }
}
