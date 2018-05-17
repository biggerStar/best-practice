```
gcc -c a.c b.c # 编译源文件,得到a.o b.o
objdump -h a.o # 查看a.o 各段的情形
objdupm -h b.o
ld a.o b.o -e main -o ab # ld连接器，-e指定入口函数，ld默认的入口为_start，-o输出
objdump -h ab # 查看链接后的情况
```

- 查看反汇编结果
- a.o中的两个引用:shard和swap，地址用0000和FFFF代替，留给链接器替换
```
objdump -d a.o  
```
- 已经被替换
```
objdump -d ab
```
 链接过程中，如何知道哪个引用需要被替换呢？每个ELF文件都有一个重定位表,例如如果在.text中有需要被重定位的地方，那么会有一个.rel.text段保存了重定位表
objdump -r a.o # 查看a.o 需要被重定向的字段

-  符号表
 每个目标文件都会有一个符号表, 当链接器需要对某个符号对引用进行重定位时，它需要确定改符号对目标地址，此时就需要去符号表中查询。
```
readelf -s a.o # 查看a.o符号表
```



