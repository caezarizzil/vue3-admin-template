<template>
  <div>
    <el-card>
      <!-- 顶部添加按钮 -->
      <el-button type="primary" icon="Plus" @click="handleAddTradeMark">
        添加品牌
      </el-button>

      <!-- 表格组件 -->
      <el-table style="margin: 16px 0" border stripe :data="trademarkList">
        <el-table-column
          width="80px"
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.logoUrl"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" width="200px" align="center">
          <template #default="scope">
            <el-button
              icon="Edit"
              size="small"
              type="primary"
              @click="handleEditTradeMark(scope.row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${scope.row.tmName}吗`"
              width="200px"
              icon="Delete"
              icon-color="red"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <!-- 
        v-model:current-page: 设置分页当前页码
        v-model:page-size: 设置分页每页条数
        page-sizes: 分页条数列表
        page-count: 页码按钮数量
        background: 背景色
        layout: 分页布局,可选值: 'total, sizes, prev, pager, next, jumper'
      -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        @size-change="getTrademarkList(1)"
        @current-change="getTrademarkList"
      />
    </el-card>

    <!-- 添加或编辑对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogFormTitle" width="40%">
      <el-form
        style="width: 80%"
        label-width="100px"
        :model="trademarkFormData"
        :rules="rules"
        ref="trademarkFormRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkFormData.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="handleBeforeUpload"
          >
            <img
              v-if="trademarkFormData.logoUrl"
              :src="trademarkFormData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqTrademarkList,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type { TradeMark, TradeMarkList } from '@/api/product/trademark/type'
import type { FormInstance, UploadProps, UploadRawFile } from 'element-plus'

/** 当前页码 */
const currentPage = ref<number>(1)
/** 每页条数 */
const pageSize = ref<number>(3)
/** 存储品牌总数 */
const total = ref<number>(0)
/** 存储当前品牌数组 */
const trademarkList = ref<TradeMarkList>([])
/** 对话框表单是否显示 */
const dialogFormVisible = ref<boolean>(false)
/** 对话框表单标题 */
const dialogFormTitle = ref<string>('添加品牌')
/** 表单ref */
const trademarkFormRef = ref<FormInstance>()
/** 表单数据 */
let trademarkFormData = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

/** 校验规则 */
const rules = {
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, max: 16, message: '品牌名称长度为2-16个字符', trigger: 'blur' },
  ],
  logoUrl: [{ required: true, message: '请上传品牌LOGO', trigger: 'change' }],
}

/** 获取品牌数据 */
const getTrademarkList = async (pageNo = 1) => {
  // 发送请求
  const result = await reqTrademarkList(pageNo, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    trademarkList.value = result.data.records
  }
}

/** 添加品牌按钮回调 */
const handleAddTradeMark = () => {
  // 清空表单数据
  trademarkFormData.id = undefined
  trademarkFormData.tmName = ''
  trademarkFormData.logoUrl = ''

  // 打开对话框表单
  dialogFormVisible.value = true
  dialogFormTitle.value = '添加品牌'

  // trademarkFormRef.value?.clearValidate('tmName')
  // trademarkFormRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    trademarkFormRef.value?.clearValidate('tmName')
    trademarkFormRef.value?.clearValidate('logoUrl')
  })
}

/** 修改品牌按钮回调 */
const handleEditTradeMark = (row: TradeMark) => {
  // 将当前品牌数据赋值给表单数据
  trademarkFormData.id = row.id
  trademarkFormData.tmName = row.tmName
  trademarkFormData.logoUrl = row.logoUrl

  // 打开对话框表单
  dialogFormVisible.value = true
  dialogFormTitle.value = '修改品牌'

  // trademarkFormRef.value?.clearValidate('tmName')
  // trademarkFormRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    trademarkFormRef.value?.clearValidate('tmName')
    trademarkFormRef.value?.clearValidate('logoUrl')
  })
}

/** 删除品牌按钮回调 */
const handleDelete = async (row: TradeMark) => {
  // 发送请求
  const result = await reqDeleteTrademark(row.id!)
  // 判断请求结果
  if (result.code === 200) {
    // 提示成功
    ElMessage({
      message: '删除品牌成功',
      type: 'success',
    })
    // 重新获取品牌数据
    getTrademarkList(trademarkList.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    // 提示失败
    ElMessage({
      message: '删除品牌失败',
      type: 'error',
    })
  }
}

/** 上传图片前进行处理 */
const handleBeforeUpload: UploadProps['beforeUpload'] = (
  rawFile: UploadRawFile,
) => {
  // 判断文件类型
  const isJPG = rawFile.type === 'image/jpeg'
  const isPNG = rawFile.type === 'image/png'
  const isGif = rawFile.type === 'image/gif'
  // 判断文件类型和大小是否符合要求
  if (!isJPG && !isPNG && !isGif) {
    ElMessage({
      message: '上传头像图片只能是 JPG/PNG/GIF 格式!',
      type: 'error',
    })
    return false
  }
  // 判断文件大小是否符合要求
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage({
      message: '上传头像图片大小不能超过 5MB!',
      type: 'error',
    })
    return false
  }
  // 返回判断结果
  return true
}

/** 上传成功后的回调 */
const handleUploadSuccess: UploadProps['onSuccess'] = (response: any) => {
  // 上传成功后,将图片地址赋值给表单
  trademarkFormData.logoUrl = response.data
}

/** 提交表单按钮回调 */
const handleSubmit = async () => {
  // 校验表单
  await trademarkFormRef.value?.validate()
  // 发送请求
  const result = await reqAddOrUpdateTrademark(trademarkFormData)
  // 获取提示信息
  const tip = trademarkFormData.id ? '修改' : '添加'
  // 判断请求结果
  if (result.code === 200) {
    // 关闭对话框表单
    dialogFormVisible.value = false
    // 提示成功
    ElMessage({
      message: `${tip}品牌成功`,
      type: 'success',
    })
    // 重新获取品牌数据
    getTrademarkList(currentPage.value)
  } else {
    // 提示失败
    ElMessage({
      message: `${tip}品牌失败`,
      type: 'error',
    })
    // 关闭对话框表单
    dialogFormVisible.value = false
  }
}

/** 页面加载完时加载品牌数据 */
onMounted(() => {
  getTrademarkList()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
